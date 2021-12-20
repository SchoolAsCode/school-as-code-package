import { ENV } from '../constants.js';

export const compileEnv = (args = []) => {
    const userEnv = args
        .map((arg) =>
            arg.startsWith('u=')
                ? { userName: arg.replace('u=', '') }
                : arg.startsWith('r=')
                ? { repoName: arg.replace('r=', '') }
                : arg.startsWith('t=')
                ? { token: arg.replace('t=', '') }
                : arg.startsWith('cp=')
                ? { configPath: arg.replace('cp=', '').split(path.sep) }
                : arg.startsWith('rp=')
                ? { readmePath: arg.replace('rp=', '').split(path.sep) }
                : arg.startsWith('ap=')
                ? { assetsPath: arg.replace('ap=', '').split(path.sep) }
                : null
        )
        .filter((arg) => arg !== null)
        .reduce((all, next) => Object.assign(all, next), {});

    return Object.assign(ENV, userEnv);
};
