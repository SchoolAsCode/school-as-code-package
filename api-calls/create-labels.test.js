import path from 'path';
import { fileURLToPath } from 'url';

import { parseConfigs } from '../parse-configs/index.js';
import { createLabels } from './create-labels.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToConfigs = path.join(__dirname, '..', 'config');

const configs = await parseConfigs(pathToConfigs);

configs.env.GITHUB_ACTOR = 'marple';
configs.env.token = 'urpil';

createLabels(configs);
