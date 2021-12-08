#!/usr/bin/env node

/* configure

  configures the repository settings

  right now it calls one imaginary `configureRepo` API call
    but that can change as we figure out how to do this

*/

import path from "path";

import { compileEnv } from "../compile-env/index.js";
import { parseConfigs } from "../parse-configs/index.js";

import { configureRepo } from "../api-calls/configure-repo.js";

// --- compile env from CLI args & defaults ---

const env = compileEnv(process.argv.slice(2));

// --- parse school configs ---

const configPath = path.join(process.cwd(), ...env.configPath);
const configs = await parseConfigs(configPath, env);

// --- do the things ---

await configureRepo(configs);
