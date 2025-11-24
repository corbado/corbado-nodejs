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

  it('should validate notNull correctly', () => {
    expect(() => Assert.notNull('valid', 'test')).not.toThrow();
    expect(() => Assert.notNull(0, 'zero')).not.toThrow();
    expect(() => Assert.notNull(false, 'false')).not.toThrow();

    expect(() => Assert.notNull(null, 'null value')).toThrow(BaseError);
    expect(() => Assert.notNull(undefined, 'undefined value')).toThrow(BaseError);
  });

  it('should validate notEmptyString correctly', () => {
    expect(() => Assert.notEmptyString('valid', 'test')).not.toThrow();
    expect(() => Assert.notEmptyString('a', 'single char')).not.toThrow();

    expect(() => Assert.notEmptyString('', 'empty string')).toThrow(BaseError);
  });

  it('should validate stringInSet correctly', () => {
    const validValues = ['apple', 'banana', 'cherry'];

    expect(() => Assert.stringInSet('apple', validValues, 'fruit')).not.toThrow();
    expect(() => Assert.stringInSet('banana', validValues, 'fruit')).not.toThrow();

    expect(() => Assert.stringInSet('orange', validValues, 'invalid fruit')).toThrow(BaseError);
    expect(() => Assert.stringInSet('', validValues, 'empty fruit')).toThrow(BaseError);
  });

  it('should validate keysInObject correctly', () => {
    const testObj = { name: 'test', age: 25, active: true };

    expect(() => Assert.keysInObject(['name'], testObj, 'test object')).not.toThrow();
    expect(() => Assert.keysInObject(['name', 'age'], testObj, 'test object')).not.toThrow();
    expect(() => Assert.keysInObject(['name', 'age', 'active'], testObj, 'test object')).not.toThrow();

    expect(() => Assert.keysInObject(['missing'], testObj, 'test object')).toThrow(BaseError);
    expect(() => Assert.keysInObject(['name', 'missing'], testObj, 'test object')).toThrow(BaseError);
  });

  it('should validate URL correctly', () => {
    expect(() => Assert.validURL('https://example.com', 'valid URL')).not.toThrow();
    expect(() => Assert.validURL('http://test.com', 'http URL')).not.toThrow();

    expect(() => Assert.validURL('', 'empty URL')).toThrow(BaseError);
    expect(() => Assert.validURL('invalid-url', 'malformed URL')).toThrow(BaseError);
    expect(() => Assert.validURL('https://user:pass@example.com', 'URL with credentials')).toThrow(BaseError);
    expect(() => Assert.validURL('https://example.com/path', 'URL with path')).toThrow(BaseError);
    expect(() => Assert.validURL('https://example.com?query=1', 'URL with query')).toThrow(BaseError);
    expect(() => Assert.validURL('https://example.com#fragment', 'URL with fragment')).toThrow(BaseError);
  });
});
