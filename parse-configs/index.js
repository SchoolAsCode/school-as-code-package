import fs from 'fs';
import path from 'path';
import util from 'util';

import jsYaml from 'js-yaml';

const readFile = util.promisify(fs.readFile);

export const getObjectsFromEntries = (compiledConfigs) => {
  return Object.fromEntries(Object.entries(compiledConfigs).filter((entry) => entry[1] !== undefined))
}

export const parseConfigs = async (configBasePath = '', env = {}) => {
  const configs = fs
    .readdirSync(configBasePath)
    .filter((name) => name.endsWith('.yml'))
    .map((fileName) => ({
      fileName,
      base: fileName.replace('.yml', ''),
      path: path.join(configBasePath, fileName),
    }));

  const readingConfigs = configs.map((config) =>
    readFile(config.path, 'utf-8'),
  );

  const ymlConfigs = await Promise.all(readingConfigs);

  const parsedJsonConfigs = ymlConfigs.map((yamlText) => jsYaml.load(yamlText));

  const compiledConfigs = parsedJsonConfigs.reduce(
    (all, next, i) => ((all[configs[i].base] = next), all),
    {},
  );

  const definedConfigs = getObjectsFromEntries(compiledConfigs);

  // this is how action info gets into the config
  definedConfigs.env = env;

  return definedConfigs;
};
