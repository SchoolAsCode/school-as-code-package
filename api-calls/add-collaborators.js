import fetch from 'node-fetch';

export const requestPayload = (env, permission) => {
  const options = {
      method: 'PUT',
      body: JSON.stringify({ permission }),
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${env.token}`,
      },
    };
  return options
}

// this has two different users because the first one is the repo owner and the second is the collaborator
export const requestUrl = (env, user) => `https://api.github.com/repos/${env.user}/${env.repo}/collaborators/${user}`;

export const collaboratorApiCall = async (env, user = '', permission = 'triage') => {
  fetch(requestUrl(env, permission), requestPayload(env, user , permission));
};

export const addCollaborators = async ( apiCall, { env = {}, learners = [] }) => {

  const collaboratorPromises = [];

  for (const learner of learners) {
    const res = apiCall(env, learner.user, 'push');
    collaboratorPromises.push(res);
  }

  await Promise.all(collaboratorPromises);
};
