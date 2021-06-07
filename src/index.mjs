import YAML from 'yaml';
import fs from 'fs';
import { spawn } from 'child_process';

const verify = (cmd, { input, output }) => new Promise((resolve, reject) => {
  let actual = '';

  const proc = spawn(cmd);
  proc.stdin.write(input);
  proc.stdin.write('\n');

  proc.stdout.on('data', (data) => {
    actual += data;
  });

  proc.on('close', (code) => {
    if (code) {
      reject(code);
    } else {
      if (actual === output) {
        resolve();
      } else {
        reject({ actual, output });
      }
    }
  });
});

(async () => {
  const readme = await fs.promises.readFile(process.argv[2], 'utf-8');
  const { tests } = YAML.parse(readme);

  try {
    await Promise.all(tests.map(test => verify(process.argv[3], test)));
  } catch (e) {
    console.log(e);
  }
})();
