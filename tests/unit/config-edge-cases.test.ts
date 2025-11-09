import { Config } from '../../src/index.js';
import { BaseError } from '../../src/errors/index.js';

describe('Config Edge Cases', () => {
  it('should handle empty string parameters', () => {
    expect(() => new Config('', '', '', '')).toThrow(BaseError);
  });

  it('should handle null parameters', () => {
    expect(
      () =>
        new Config(
          null as unknown as string,
          null as unknown as string,
          null as unknown as string,
          null as unknown as string,
        ),
    ).toThrow(BaseError);
  });

  it('should handle undefined parameters', () => {
    expect(
      () =>
        new Config(
          undefined as unknown as string,
          undefined as unknown as string,
          undefined as unknown as string,
          undefined as unknown as string,
        ),
    ).toThrow(BaseError);
  });

  it('should validate URL formats', () => {
    expect(() => new Config('valid', 'secret', 'invalid-url', 'backend')).toThrow(BaseError);
    expect(() => new Config('valid', 'secret', 'frontend', 'invalid-url')).toThrow(BaseError);
  });
});
