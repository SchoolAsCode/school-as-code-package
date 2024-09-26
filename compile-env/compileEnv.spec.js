import { compileEnv } from ".";
import { ENV } from '../defaults';

describe('return an environment object for the configuration', () => {
  test('it should return the defaults if nothing else is present', () => {
    const input = [];
    const expected = { ...ENV };
    const result = compileEnv(input);

    expect(result).toEqual(expected);
  });

  test('it should set the "user" key with the value for the "user=" string', () => {
      const user = "fakey-jake";
      const input = [`user=${user}`];
      const expected = { ...ENV, user };
      const result = compileEnv(input);

      expect(result).toEqual(expected);
  });

  test('it should set the "repo" key with the value for the "repo=" string', () => {
      const repo = "learning-space";
      const input = [`repo=${repo}`];
      const expected = { ...ENV, repo };
      const result = compileEnv(input);

      expect(result).toEqual(expected);
  });


  test('it should set the "token" key with the value for the "token=" string', () => {
      const token = "secret-token";
      const input = [`token=${token}`];
      const expected = { ...ENV, token };
      const result = compileEnv(input);

      expect(result).toEqual(expected);
  });
});