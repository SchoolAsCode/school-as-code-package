#!/usr/bin/env node

import { exec } from 'child_process';
import path from 'path';
import { promisify } from 'util';

import { compileEnv } from '../compile-env/index.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const execPromise = promisify(exec);

// --- compile env from CLI args & defaults ---

const env = compileEnv(process.argv.slice(2));

// --- do the things ---

const nodeParams = `user=${env.user} repo=${env.repo} token=${env.token}`;

// add collaborators
execPromise(`node ${path.join(__dirname, 'collaborators.js')} ${nodeParams}`);

// fetch and save user avatars
execPromise(
  `node ${path.join(__dirname, 'avatars.js')} user=${env.user} ${nodeParams}`,
);

// setup project board, labels & milestones
//  wait to persist new configs before rendering README
await execPromise(
  `node ${path.join(__dirname, 'projecting.js')} ${nodeParams}`,
);

// render the new README
execPromise(`node ${path.join(__dirname, 'render-readme.js')} ${nodeParams}`);
