import jest from 'jest-mock';
import {
    addCollaborators,
    requestPayload,
    requestUrl,
 } from "./add-collaborators";

describe('addCollaborators', () => {
    test('calls the collaboratorsApiCall function for each collaborator to add to the repo', () => {
        const env = {};
        const learners = [
            'first-learner',
            'second-learner'
        ];
        const apiCall = jest.fn();
        addCollaborators(apiCall, { env, learners });

        expect(apiCall.mock.calls.length).toBe(2);
    });

    test('does not call the collaboratorApiCall function if there are no learners provided', () => {
        const env = {};
        const learners = [];
        const apiCall = jest.fn();
        addCollaborators(apiCall, { env, learners });

        expect(apiCall.mock.calls.length).toBe(0);
    });
});

describe('requestPayload', () => {
    test('returns the options payload based on the token and permissions requested', () => {
      const env = {
          repo: 'repository-for-reelz',
          token: "ABC123",
      };
      const permission = 'readOnly';
      const expected = {
          method: 'PUT',
          body: JSON.stringify({ permission }),
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `Bearer ${env.token}`,
          },
      }
      const result = requestPayload(env, permission)

      expect(result).toEqual(expected);
    });
});

describe('requestUrl', () => {
    test('returns the correct URL string for the user and repo', () => {
        const user = 'new-collaborator';
        const env = {
            repo: 'Best-Repo',
            user: 'repo-owner',
        };
        const expected = `https://api.github.com/repos/${env.user}/${env.repo}/collaborators/${user}`
        const result = requestUrl(env, user);

        expect(result).toEqual(expected);
    });
});