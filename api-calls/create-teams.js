import fetch from "node-fetch";

import { USER_TYPES } from "../constants.js";

const BASE_URL = "https://api.github.com/repos";

export const createTeams = async (configs) => {
  // console.log(configs.env); // repo secrets, name, user account, ...

  USER_TYPES.forEach((userType) => {
    console.log(configs[userType]);

    if (configs[userType].length === 0) {
      return;
    }

    /*
      does the team exist?
        create it if it doesn't

      make sure every user is in the team

    */
  });
};
