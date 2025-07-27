import { Config } from '../../src/index.js';

describe('SDK Error Handling', () => {
  it('should create config successfully with valid parameters', () => {
    expect(
      () => new Config('pro-test', 'corbado1_secret', 'https://frontend.com', 'https://backend.com'),
    ).not.toThrow();
  });

  it('should handle invalid config in createClient', () => {
    expect(() => new Config('', '', '', '')).toThrow();
  });
});
