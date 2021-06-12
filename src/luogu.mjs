#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import axios from 'axios';

(async () => {
  const [,, problemId] = process.argv;
  const url = `https://www.luogu.com.cn/problem/${problemId}`;
  const { data: { currentData: { problem: { samples } } } } = await axios.get(url, { headers: { 'x-luogu-type': 'content-only' } });

  const readme = YAML.stringify({ url, samples: samples.map(([ input, output ]) => ({ input, output })) });
  // const { data: makefile } = await axios.get('https://raw.githubusercontent.com/aguegu/localjudge/main/Makefile.template', { responseType: 'text' });
  const { data: makefile } = await axios.get('https://gitee.com/aGuegu/localjudge/raw/main/Makefile.template', { responseType: 'text' });

  // const { data: maincpp } = await axios.get('https://raw.githubusercontent.com/aguegu/localjudge/main/main.cpp.template', { responseType: 'text' });
  const { data: maincpp } = await axios.get('https://gitee.com/aGuegu/localjudge/raw/main/main.cpp.template', { responseType: 'text' });

  await fs.promises.mkdir(problemId);
  await Promise.all([
    fs.promises.writeFile(path.join(problemId, 'main.cpp'), maincpp),
    fs.promises.writeFile(path.join(problemId, 'Makefile'), makefile),
    fs.promises.writeFile(path.join(problemId, 'readme.yaml'), readme)
  ]);

})();
