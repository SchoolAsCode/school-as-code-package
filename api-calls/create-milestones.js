import fetch from 'node-fetch';

import { nameToKey } from '../utils/name-to-key.js';

export const createMilestones = async ({ materials = {}, env = {} }) => {
    const milestones = materials.path
        .map((material) => material.name)
        .map(nameToKey);

    const headers = {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${env.token}`,
    };

    // will also need to add the milestone property to each material in config
    //  then persist the new config

    return await Promise.all(
        milestones.map((milestone) => {
            // this call needs some work
            console.log('milestone: ', milestone);
            // fetch(
            //   `https://api.github.com/repos/${env.userName}/${env.repoName}/milestones`,
            //   {
            //     method: "POST",
            //     body: `{"title": "?", "state": "open", "description": "${milestone}"`,
            //     headers,
            //   }
            // )
        })
    );
};
