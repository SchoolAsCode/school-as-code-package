#!/usr/bin/env node

/* collaborators

  creates teams for all the user types that exist

  - checks if teams already exist
  - sets permissions for each team (are they different?)
  - adds users to their respective teams

*/

import path from "path";

import { compileEnv } from "../compile-env/index.js";
import { parseConfigs } from "../parse-configs/index.js";

import { addCollaborators } from "../api-calls/add-collaborators.js";

// --- compile env from CLI args & defaults ---

const env = compileEnv(process.argv.slice(2));

// --- parse school configs ---

const configPath = path.join(process.cwd(), ...env.configPath);
const configs = await parseConfigs(configPath, env);

// --- do the things ---

await addCollaborators(configs);
