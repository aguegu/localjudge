#!/usr/bin/env node
/* eslint-disable no-console */

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
    reject(new Error(JSON.stringify({ cpu, memory, elapsed })));
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
      reject(new Error(actual));
    } else if (actual.trim() === output.trim()) {
      resolve();
    } else {
      reject(new Error(actual));
    }
  });
});

(async () => {
  const [,, cnf, cmd] = process.argv;
  const readme = await fs.promises.readFile(cnf, 'utf-8');
  const { samples } = YAML.parse(readme);
  const results = await Promise.allSettled(samples.map((sample) => verify(cmd, sample)));
  // console.log(results);
  results.forEach(({ status, reason }, i) => {
    const { input, output } = samples[i];
    if (status === 'fulfilled') {
      const multilineInput = input.split('\n').length > 1;
      console.log(`${chalk.cyan('input')}: ${multilineInput ? `\n${input}` : `${input}\t`}${chalk.blue('output')}: ${output}\t${chalk.green('SUCCESS')}`);
    } else {
      const multilineInput = input.split('\n').length > 1;
      console.log(`${chalk.cyan('input')}: ${multilineInput ? `\n${input}` : `${input}\t`}${chalk.blue('output')}: ${output}\tactual: ${chalk.yellow(reason.message)}\t${chalk.red('FAILED')}`);
    }
  });
})();
