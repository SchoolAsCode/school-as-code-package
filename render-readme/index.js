import fs from 'fs';
import path from 'path';
import util from 'util';

import prettier from 'prettier';

import { top } from './top.js';
import { section } from './section.js';

import { materials } from './components/materials.js';
import { learner } from './components/learner.js';

const readFile = util.promisify(fs.readFile);

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const prettierConfigPath = path.join(__dirname, '..', '.prettierrc.json');
const prettierConfigText = await readFile(prettierConfigPath, 'utf-8');
const prettierConfig = JSON.parse(prettierConfigText);
prettierConfig.parser = 'markdown';

export const renderReadme = (config) =>
  Object.fromEntries(
    Object.entries({
      top: top(config),
      materials:
        config?.materials?.path?.length > 0
          ? section(config, {
              title: 'Materials',
              intro: config.materials.description,
              component: materials,
              data: config.materials.path,
            })
          : '',
      learners:
        config?.learners?.length > 0
          ? section(config, {
              title: 'Learners',
              component: learner,
              data: config.learners,
            })
          : '',
    }).map((entry) => [entry[0], prettier.format(entry[1], prettierConfig)]),
  );
