#!/usr/bin/env node
import fs from 'fs';
import YAML from 'yaml';
import axios from 'axios';

(async () => {
  const [,, problemId] = process.argv;
  const url = `https://www.luogu.com.cn/problem/${problemId}`;
  const { data: { currentData: { problem: { samples } } } } = await axios.get(url, { headers: { 'x-luogu-type': 'content-only' } });

  const readme = YAML.stringify({ url, samples: samples.map(([ input, output ]) => ({ input, output })) });
  const { data: makefile } = await axios.get('https://raw.githubusercontent.com/aguegu/localjudge/main/Makefile.template', { responseType: 'text' });
  const { data: main } = await axios.get('https://raw.githubusercontent.com/aguegu/localjudge/main/main.cpp.template', { responseType: 'text' });

  await fs.promises.mkdir
})();
