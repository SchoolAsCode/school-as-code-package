#!/usr/bin/env node

/* readme

  renders a new README based on config and saves it to the repo

*/

import fs from 'fs';
import path from 'path';
import util from 'util';

import prettier from 'prettier';

import { compileEnv } from '../compile-env/index.js';
import { parseConfigs } from '../parse-configs/index.js';

import { renderReadme } from '../render-readme/index.js';
import { replaceInReadme } from '../utils/replace-in-readme.js';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// --- compile env from CLI args & defaults ---

const env = compileEnv(process.argv.slice(2));

// --- parse school configs ---

const configPath = path.join(process.cwd(), ...env.configPath);
const configs = await parseConfigs(configPath, env);

// --- render & write new README ---

const readmePath = path.join(process.cwd(), ...env.readmePath);
const oldReadme = fs.existsSync(readmePath)
  ? await readFile(readmePath, 'utf-8')
  : '';

const content = renderReadme(configs);

const newReadme = ['top', 'materials', 'learners']
  .map((sectionName) => [sectionName, content[sectionName]])
  .reduce((all, next) => replaceInReadme(next[0], next[1], all), oldReadme);

const formattedReadme = prettier.format(newReadme, {
  printWidth: 80,
  proseWrap: 'always',
  parser: 'markdown',
});

await writeFile(readmePath, formattedReadme, 'utf-8');
