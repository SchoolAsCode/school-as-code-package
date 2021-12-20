import path from 'path';
import { fileURLToPath } from 'url';

import { parseConfigs } from '../parse-configs/index.js';
import { createTeams } from './create-teams.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToConfigs = path.join(__dirname, '..', 'config');

const configs = await parseConfigs(pathToConfigs);

configs.env.GITHUB_ACTOR = 'marple';
configs.env.token = 'urpil';

createTeams(configs);
