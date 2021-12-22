import fs from "fs";
import path from "path";
import util from "util";

import jsYaml from "js-yaml";

const readFile = util.promisify(fs.readFile);

export const parseConfigs = async (configBasePath = "", env = {}) => {
  const configs = fs
    .readdirSync(configBasePath)
    .filter((name) => name.endsWith(".yml"))
    .map((fileName) => ({
      fileName,
      base: fileName.replace(".yml", ""),
      path: path.join(configBasePath, fileName),
    }));

  const readingConfigs = configs.map((config) =>
    readFile(config.path, "utf-8")
  );

  const ymlConfigs = await Promise.all(readingConfigs);

  const parsedJsonConfigs = ymlConfigs.map((yamlText) => jsYaml.load(yamlText));

  const compiledConfigs = parsedJsonConfigs.reduce(
    (all, next, i) => ((all[configs[i].base] = next), all),
    {}
  );

  // this is how action info gets into the config
  compiledConfigs.env = env;

  return compiledConfigs;
};
