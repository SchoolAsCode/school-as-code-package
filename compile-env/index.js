import { ENV } from '../defaults/index.js';

export const compileEnv = (args = []) =>
  Object.assign(
    ENV,
    args
      .map((arg) =>
        arg.startsWith('user=')
          ? { user: arg.replace('user=', '') }
          : arg.startsWith('repo=')
          ? { repo: arg.replace('repo=', '') }
          : arg.startsWith('token=')
          ? { token: arg.replace('token=', '') }
          : arg.startsWith('configPath=')
          ? { configPath: arg.replace('configPath=', '').split(path.sep) }
          : arg.startsWith('readmePath=')
          ? { readmePath: arg.replace('readmePath=', '').split(path.sep) }
          : arg.startsWith('assetsPath=')
          ? { assetsPath: arg.replace('assetsPath=', '').split(path.sep) }
          : null,
      )
      .filter((arg) => arg !== null)
      .reduce((all, next) => Object.assign(all, next), {}),
  );
