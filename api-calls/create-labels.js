import fetch from 'node-fetch';

export const createLabels = async ({ materials = {}, env = {} }) => {
  const labelPromises = [];

  for (const label of materials.board.labels) {
    console.log('creating label: ', label.name);
    const res = fetch(
      `https://api.github.com/repos/${env.user}/${env.repo}/labels`,
      {
        method: 'POST',
        body: JSON.stringify(label),
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${env.token}`,
        },
      },
    );
    labelPromises.push(res);
  }

  await Promise.all(labelPromises);
};
