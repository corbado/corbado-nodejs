import { BaseError, ServerError, ValidationError } from '../../src/errors/index.js';
import { ValidationErrorNames } from '../../src/errors/validationError.js';

describe('Error Classes', () => {
  describe('BaseError', () => {
    it('should create BaseError with all properties', () => {
      const error = new BaseError('Test Error', 1001, 'Test message', true);

      expect(error.name).toBe('Test Error');
      expect(error.errorCode).toBe(1001);
      expect(error.message).toBe('Test message');
      expect(error.isRetryable).toBe(true);
    });

    it('should create BaseError with default isRetryable false', () => {
      const error = new BaseError('Default Error', 2001, 'Default message');

      expect(error.name).toBe('Default Error');
      expect(error.errorCode).toBe(2001);
      expect(error.message).toBe('Default message');
      expect(error.isRetryable).toBe(false);
    });

    it('should be instance of Error', () => {
      const error = new BaseError('Instance Test', 3001, 'Instance message');

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(BaseError);
    });
  });

  describe('ValidationError', () => {
    it('should create ValidationError with enum name', () => {
      const error = new ValidationError(ValidationErrorNames.JWTExpired, true, 'Custom description');

      expect(error.name).toBe(ValidationErrorNames.JWTExpired);
      expect(error.isRetryable).toBe(true);
      expect(error.message).toBe('Custom description');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error).toBeInstanceOf(BaseError);
    });

    it('should create ValidationError with default values', () => {
      const error = new ValidationError(ValidationErrorNames.JWTInvalid);

      expect(error.name).toBe(ValidationErrorNames.JWTInvalid);
      expect(error.isRetryable).toBe(false);
      expect(error).toBeInstanceOf(ValidationError);
    });
  });

  describe('ServerError', () => {
    it('should create ServerError with response data', () => {
      const requestData = { requestID: 'req-123', link: 'https://example.com' };
      const errorDetails = { validation: [{ field: 'test', message: 'Test error' }] };
      const error = new ServerError(5001, 'Server message', requestData, 1.5, errorDetails);

      expect(error.httpStatusCode).toBe(5001);
      expect(error.requestData).toEqual(requestData);
      expect(error.runtime).toBe(1.5);
      expect(error.error).toEqual(errorDetails);
    });

    it('should use getter methods correctly', () => {
      const requestData = { requestID: 'req-456', link: 'https://test.com' };
      const errorDetails = { validation: [{ field: 'email', message: 'Invalid email' }] };
      const error = new ServerError(400, 'Bad Request', requestData, 2.3, errorDetails);

      expect(error.getHttpStatusCode()).toBe(400);
      expect(error.getRequestData()).toEqual(requestData);
      expect(error.getRequestId()).toBe('req-456');
      expect(error.getRuntime()).toBe(2.3);
      expect(error.getError()).toEqual(errorDetails);
    });

    it('should handle validation messages correctly', () => {
      const requestData = { requestID: 'req-789', link: 'https://validation.com' };
      const errorDetails = {
        validation: [
          { field: 'email', message: 'Invalid email format' },
          { field: 'password', message: 'Password too short' },
        ],
      };
      const error = new ServerError(422, 'Validation Error', requestData, 1.0, errorDetails);

      const validationMessages = error.getValidationMessages();
      expect(validationMessages).toEqual(['email: Invalid email format', 'password: Password too short']);

      expect(error.message).toContain('email: Invalid email format, password: Password too short');
    });

    it('should handle empty validation messages', () => {
      const requestData = { requestID: 'req-empty', link: 'https://empty.com' };
      const errorDetails = {};
      const error = new ServerError(500, 'Internal Error', requestData, 0.5, errorDetails);

      expect(error.getValidationMessages()).toEqual([]);
      expect(error.message).toContain('validation messages: ');
    });

    it('should handle missing requestData gracefully', () => {
      const requestData = { requestID: '', link: '' };
      const errorDetails = {};
      const error = new ServerError(404, 'Not Found', requestData, 0.1, errorDetails);

      expect(error.getRequestId()).toBe('');
    });

    it('should handle missing requestID gracefully', () => {
      const requestData = { requestID: '', link: 'https://test.com' };
      const errorDetails = {};
      const error = new ServerError(503, 'Service Unavailable', requestData, 3.0, errorDetails);

      expect(error.getRequestId()).toBe('');
      expect(error.getRequestData()).toEqual(requestData);
    });
  });
});
