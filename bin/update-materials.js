#!/usr/bin/env node

/* update materials

  updates milestones
  re-renders the materials section of the README

*/

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import prettier from 'prettier';

import { compileEnv } from '../compile-env/index.js';
import { parseConfigs } from '../parse-configs/index.js';
import { persistConfigs } from '../persist-configs/index.js';

import { createMilestones } from '../api-calls/create-milestones.js';
import { renderReadme } from '../render-readme/index.js';

import { replaceInReadme } from '../utils/replace-in-readme.js';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// --- compile env from CLI args & defaults ---

const env = compileEnv(process.argv.slice(2));

// --- parse school configs ---

const configPath = path.join(process.cwd(), ...env.configPath);
const configs = await parseConfigs(configPath, env);

// --- do the things ---

// create missing milestones
await createMilestones(configs);

// --- render & write new README ---

const readmePath = path.join(process.cwd(), ...env.readmePath);
const oldReadme = fs.existsSync(readmePath)
  ? await readFile(readmePath, 'utf-8')
  : '';

const content = renderReadme({ materials: configs.materials });

const newReadme = ['materials']
  .map((sectionName) => [sectionName, content[sectionName]])
  .reduce((all, next) => replaceInReadme(next[0], next[1], all), oldReadme);

const formattedReadme = prettier.format(newReadme, {
  printWidth: 80,
  proseWrap: 'always',
  parser: 'markdown',
});

// --- save changes to config & README---

await Promise.all([
  persistConfigs(configPath, configs),
  writeFile(readmePath, formattedReadme, 'utf-8'),
]);
