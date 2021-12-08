#!/usr/bin/env node

/* readme

  renders a new README based on config and saves it to the repo

*/

import fs from "fs";
import path from "path";
import util from "util";

import { compileEnv } from "../compile-env/index.js";
import { parseConfigs } from "../parse-configs/index.js";

import { readme } from "../readme/index.js";

const writeFile = util.promisify(fs.writeFile);

// --- compile env from CLI args & defaults ---

const env = compileEnv(process.argv.slice(2));

// --- parse school configs ---

const configPath = path.join(process.cwd(), ...env.configPath);
const configs = await parseConfigs(configPath, env);

// --- render & write new README ---

const readmeText = readme(configs);
const readmePath = path.join(process.cwd(), ...env.readmePath);
await writeFile(readmePath, readmeText, "utf-8");
