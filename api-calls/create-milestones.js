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

    const milestonesURL = `https://api.github.com/repos/${env.user}/${env.repo}/milestones`;
    // not .all so milestone numbers are in order
    const res = await fetch(milestonesURL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });
    const data = await res.json();

    if (
      !material.milestone &&
      data.errors &&
      data.errors.find((error) => error.code === 'already_exists')
    ) {
      const res = await fetch(milestonesURL);
      const milestones = await res.json();
      const milestone = milestones.find(
        (milestone) => milestone.title === nameToKey(material.name),
      );
      material.milestone = milestone.number;
    } else if (data.number) {
      // update config by side-effect
      material.milestone = data.number;
    }
  }
};
