import fetch from 'node-fetch';

import { BOARD } from '../defaults/index.js';

const REPO_BASE_URL = 'https://api.github.com/repos';
const PROJECT_BASE_URL = 'https://api.github.com/projects';

export const createBoard = async ({ env = {}, materials = {} }) => {
  if (!materials.board) {
    materials.board = BOARD;
  } else {
    materials.board = Object.assign(BOARD, materials.board);
  }

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${env.token}`,
  };

  const url = `${REPO_BASE_URL}/${env.user}/${env.repo}/projects`;

  console.log('creating board');

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(materials.board),
    headers,
  });
  const project = await res.json();

  // update config by side-effect
  if (project.number) {
    materials.board.number = project.number;
  }

  for (const column of BOARD.columns) {
    console.log('creating column:  ', column);

    await fetch(`${PROJECT_BASE_URL}/${project.id}/columns`, {
      method: 'POST',
      body: JSON.stringify({ name: column }),
      headers,
    });
  }
};
