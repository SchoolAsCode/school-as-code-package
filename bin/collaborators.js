#!/usr/bin/env node

import path from 'path';

import { compileEnv } from '../compile-env/index.js';
import { parseConfigs } from '../parse-configs/index.js';

import { addCollaborators, collaboratorApiCall } from '../api-calls/add-collaborators.js';

// --- compile env from CLI args & defaults ---

const env = compileEnv(process.argv.slice(2));

// --- parse school configs ---

const configPath = path.join(process.cwd(), ...env.configPath);
const configs = await parseConfigs(configPath, env);

// --- do the things ---

await addCollaborators(collaboratorApiCall, { env: configs.env, learners: configs.learners });
