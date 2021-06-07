#!/usr/bin/env node

import fs from 'fs';
import YAML from 'yaml';
import chalk from 'chalk';
import { spawn } from 'child_process';

const verify = (cmd, { input, output }) => new Promise((resolve, reject) => {
  let actual = '';

  const tim = setTimeout(() => {
    reject({ input, output, actual: 'timeout' });
  }, 3000);

  const proc = spawn(cmd);
  proc.stdin.write(input);
  proc.stdin.write('\n');

  proc.stdout.on('data', (data) => {
    actual += data;
  });

  proc.on('close', (code) => {
    clearTimeout(tim);
    if (code) {
      reject({ input, output, actual });
    } else {
      if (actual === output) {
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
      console.log(`input: ${input}\t output: ${output} \t ${chalk.green('SUCCESS')}`);
    } else {
      const { input, output, actual } = reason;
      console.log(`input: ${input}\t output: ${output} \t ${chalk.red('FAILED')}`);
    }
  });
})();
