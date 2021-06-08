#!/usr/bin/env node

import fs from 'fs';
import YAML from 'yaml';
import chalk from 'chalk';
import pidusage from 'pidusage';
import { spawn } from 'child_process';

const verify = (cmd, { input, output }) => new Promise((resolve, reject) => {
  let actual = '';

  const proc = spawn(cmd);

  const tim = setTimeout(async () => {
    const { cpu, memory, elapsed } = await pidusage(proc.pid);
    proc.kill();
    reject({ input, output, actual: JSON.stringify({ cpu, memory, elapsed }) });
  }, 3000);

  proc.stdin.write(input);

  if (!input.endsWith('\n')) {
    proc.stdin.write('\n');
  }

  proc.stdout.on('data', (data) => {
    actual += data;
  });

  proc.on('close', (code) => {
    clearTimeout(tim);
    if (code) {
      reject({ input, output, actual });
    } else {
      if (actual.trim() === output.trim()) {
        resolve({ input, output });
      } else {
        reject({ input, output, actual });
      }
    }
  });
});

(async () => {
  const readme = await fs.promises.readFile(process.argv[2], 'utf-8');
  const { tests } = YAML.parse(readme);
  const results = await Promise.allSettled(tests.map(test => verify(process.argv[3], test)));
  // console.log(results);
  results.forEach(({ status, reason, value }) => {
    if (status === 'fulfilled') {
      const { input, output } = value;
      const multilineInput = input.split('\n').length > 1;
      console.log(`${chalk.cyan('input')}: ${multilineInput ? `\n${input}` : `${input}\t`}${chalk.blue('output')}: ${output}\t${chalk.green('SUCCESS')}`);
    } else {
      const { input, output, actual } = reason;
      const multilineInput = input.split('\n').length > 1;
      console.log(`${chalk.cyan('input')}: ${multilineInput ? `\n${input}` : `${input}\t`}${chalk.blue('output')}: ${output}\tactual: ${chalk.yellow(actual)}\t${chalk.red('FAILED')}`);
    }
  });
})();
