import fetch from 'node-fetch';

export const addCollaborators = async ({ env = {}, learners = [] }) => {
  const addCollaborator = async (user = '', permission = 'triage') =>
    fetch(
      `https://api.github.com/repos/${env.user}/${env.repo}/collaborators/${user}`,
      {
        method: 'PUT',
        body: JSON.stringify({ permission }),
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${env.token}`,
        },
      },
    );

  const collaboratorPromises = [];

  for (const learner of learners) {
    const res = addCollaborator(learner.user, 'push');
    collaboratorPromises.push(res);
  }

  await Promise.all(collaboratorPromises);
};
