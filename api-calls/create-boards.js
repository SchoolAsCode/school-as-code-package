import fetch from 'node-fetch';

import { MAIN_BOARD_NAME } from '../constants.js';

export const createBoards = async ({ env = {}, materials = {} }) => {
    // if no boards are present in config, create a default board:
    const defaultBoard = {
        name: MAIN_BOARD_NAME,
        description: 'for all snippets, vocabulary and deliverables',
        main: true,
    };

    console.log(materials.board);

    // if there is a .board property on materials
    //  if the board does not exist
    //    create it
    //    set materials.board to the new board number
    // else
    //  create the board
    //  set materials
};

// const yaml = require("js-yaml");
// const fs = require("fs");
// const fetch = require("node-fetch");

// const REPO_BASE_URL = "https://api.github.com/repos";
// const PROJECT_BASE_URL = "https://api.github.com/projects";
// const headers = {
//   Accept: "application/vnd.github.v3+json",
//   Authorization: `Bearer ${process.env.token}`,
// };

// try {
//   const doc = yaml.load(fs.readFileSync("./school.yml", "utf-8"));
//   const { homeRepo, projects } = doc;

//   projects.forEach((project) => {
//     const { columns, ...rest } = project;

//     const createProjects = fetch(
//       `${REPO_BASE_URL}/${process.env.GITHUB_ACTOR}/${homeRepo}/projects`,
//       {
//         method: "POST",
//         body: JSON.stringify(rest),
//         headers,
//       }
//     )
//       .then((res) => res.json())
//       .then((json) => {
//         return json.id;
//       });

//     const createColumns = async () => {
//       const projectId = await createProjects;
//       columns.forEach((column) => {
//         console.log(`setting ${column}`);

//         fetch(`${PROJECT_BASE_URL}/${projectId}/columns`, {
//           method: "POST",
//           body: JSON.stringify({ name: column }),
//           headers,
//         })
//           .then((res) => res.json())
//           .then((json) => console.log(json));
//       });
//     };

//     createColumns();
//   });
// } catch (e) {
//   console.log(e);
// }
