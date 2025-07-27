import Assert from '../../src/helpers/assert.js';
import { BaseError } from '../../src/errors/index.js';

describe('Assert Helper', () => {
  it('should pass for valid assertions', () => {
    expect(() => Assert.isString('test', 'value')).not.toThrow();
    expect(() => Assert.isNotEmpty('test', 'value')).not.toThrow();
  });

  it('should throw BaseError for invalid string', () => {
    expect(() => Assert.isString(123, 'number')).toThrow(BaseError);
    expect(() => Assert.isString(null, 'null')).toThrow(BaseError);
  });

  it('should throw BaseError for empty values', () => {
    expect(() => Assert.isNotEmpty('', 'empty string')).toThrow(BaseError);
    expect(() => Assert.isNotEmpty(null, 'null')).toThrow(BaseError);
    expect(() => Assert.isNotEmpty(undefined, 'undefined')).toThrow(BaseError);
  });
});
