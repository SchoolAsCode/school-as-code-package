import fetch from 'node-fetch';

import { nameToKey } from '../utils/name-to-key.js';

export const createMilestones = async ({ materials = {}, env = {} }) => {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${env.token}`,
  };

  for (const material of materials.path) {
    const milestoneName = nameToKey(material.name);

    console.log('creating milestone: ', milestoneName);

    const body = {
      title: milestoneName,
      state: 'open',
      description: material.description,
    };

    // not .all so milestone numbers are in order
    const res = await fetch(
      `https://api.github.com/repos/${env.user}/${env.repo}/milestones`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers,
      },
    );
    const data = await res.json();

    if (data.number) {
      // update config by side-effect
      material.milestone = data.number;
    }
  }
};
