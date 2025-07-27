import { BaseError, ServerError } from '../../src/errors/index.js';

describe('Error Classes', () => {
  it('should create BaseError with all properties', () => {
    const error = new BaseError('Test Error', 1001, 'Test message', true);

    expect(error.name).toBe('Test Error');
    expect(error.errorCode).toBe(1001);
    expect(error.message).toBe('Test message');
    expect(error.isRetryable).toBe(true);
  });

  it('should create ServerError with response data', () => {
    const requestData = { requestID: 'req-123', link: 'https://example.com' };
    const errorDetails = { validation: [{ field: 'test', message: 'Test error' }] };
    const error = new ServerError(5001, 'Server message', requestData, 1.5, errorDetails);

    expect(error.httpStatusCode).toBe(5001);
    expect(error.requestData).toEqual(requestData);
    expect(error.runtime).toBe(1.5);
    expect(error.error).toEqual(errorDetails);
  });
});
