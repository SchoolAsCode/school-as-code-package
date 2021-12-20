#!/usr/bin/env node

/* projecting

  sets up all the project management features for tracking study progress

  - labels
  - milestones
  - project board

*/

import path from 'path';

import { compileEnv } from '../compile-env/index.js';
import { parseConfigs } from '../parse-configs/index.js';
import { persistConfigs } from '../persist-configs/index.js';

import { createBoards } from '../api-calls/create-boards.js';
import { createLabels } from '../api-calls/create-labels.js';
import { createMilestones } from '../api-calls/create-milestones.js';

// --- compile env from CLI args & defaults ---

const env = compileEnv(process.argv.slice(2));

// --- parse school configs ---

const configPath = path.join(process.cwd(), ...env.configPath);
const configs = await parseConfigs(configPath, env);

// --- do the things ---

await Promise.all([
    createBoards(configs),
    createLabels(configs),
    createMilestones(configs),
]);

// --- persist new configs (updated by side-effect in previous step) ---

persistConfigs(configs);
