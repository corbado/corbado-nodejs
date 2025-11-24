import { AxiosError } from 'axios';
import Helper from '../../src/helpers/helpers.js';
import { BaseError, ServerError } from '../../src/errors/index.js';
import { ServerErrorType } from '../../src/errors/serverError.js';

describe('Helper Class', () => {
  describe('jsonEncode', () => {
    it('should encode valid objects to JSON', () => {
      const data = { name: 'test', value: 123 };
      const result = Helper.jsonEncode(data);

      expect(result).toBe('{"name":"test","value":123}');
    });

    it('should encode arrays to JSON', () => {
      const data = [1, 2, 3];
      const result = Helper.jsonEncode(data);

      expect(result).toBe('[1,2,3]');
    });

    it('should encode primitives to JSON', () => {
      expect(Helper.jsonEncode('string')).toBe('"string"');
      expect(Helper.jsonEncode(123)).toBe('123');
      expect(Helper.jsonEncode(true)).toBe('true');
      expect(Helper.jsonEncode(null)).toBe('null');
    });
  });

  describe('jsonDecode', () => {
    it('should decode valid JSON strings', () => {
      const jsonString = '{"name":"test","value":123}';
      const result = Helper.jsonDecode(jsonString);

      expect(result).toEqual({ name: 'test', value: 123 });
    });

    it('should decode array JSON strings', () => {
      const jsonString = '[1,2,3]';
      const result = Helper.jsonDecode(jsonString);

      expect(result).toEqual([1, 2, 3]);
    });

    it('should throw error for empty string', () => {
      expect(() => Helper.jsonDecode('')).toThrow(BaseError);
    });

    it('should throw error for invalid JSON', () => {
      expect(() => Helper.jsonDecode('invalid json')).toThrow(BaseError);
      expect(() => Helper.jsonDecode('{"incomplete":')).toThrow(BaseError);
    });
  });

  describe('isErrorHttpStatusCode', () => {
    it('should return false for success status codes', () => {
      expect(Helper.isErrorHttpStatusCode(200)).toBe(false);
      expect(Helper.isErrorHttpStatusCode(201)).toBe(false);
      expect(Helper.isErrorHttpStatusCode(204)).toBe(false);
      expect(Helper.isErrorHttpStatusCode(299)).toBe(false);
    });

    it('should return true for error status codes', () => {
      expect(Helper.isErrorHttpStatusCode(300)).toBe(true);
      expect(Helper.isErrorHttpStatusCode(400)).toBe(true);
      expect(Helper.isErrorHttpStatusCode(404)).toBe(true);
      expect(Helper.isErrorHttpStatusCode(500)).toBe(true);
    });
  });

  describe('throwServerExceptionOld', () => {
    it('should throw ServerError with complete data', () => {
      const serverErrorData: ServerErrorType = {
        httpStatusCode: 400,
        message: 'Bad Request',
        requestData: { requestID: 'req-123', link: 'https://test.com' },
        runtime: 1.5,
        error: { validation: [{ field: 'email', message: 'Invalid email' }] },
      };

      expect(() => Helper.throwServerExceptionOld(serverErrorData)).toThrow(ServerError);
    });

    it('should throw ServerError with missing error field', () => {
      const serverErrorData = {
        httpStatusCode: 500,
        message: 'Internal Error',
        requestData: { requestID: 'req-456', link: 'https://error.com' },
        runtime: 2.0,
      } as ServerErrorType;

      expect(() => Helper.throwServerExceptionOld(serverErrorData)).toThrow(ServerError);
    });

    it('should throw error for missing required keys', () => {
      const incompleteData = {
        httpStatusCode: 400,
        message: 'Bad Request',
      } as ServerErrorType;

      expect(() => Helper.throwServerExceptionOld(incompleteData)).toThrow(BaseError);
    });
  });

  describe('convertToServerError', () => {
    it('should convert AxiosError with server error response', () => {
      const serverErrorData = {
        httpStatusCode: 422,
        message: 'Validation Error',
        requestData: { requestID: 'req-789', link: 'https://validation.com' },
        runtime: 0.8,
        error: { validation: [{ field: 'name', message: 'Required' }] },
      };

      // Create a proper AxiosError instance
      const axiosError = new AxiosError('Server Error');
      axiosError.response = {
        data: serverErrorData,
        status: 422,
        statusText: 'Unprocessable Entity',
        headers: {},
        config: {} as any,
      };

      const result = Helper.convertToServerError(axiosError, 'test origin');

      expect(result).toBeInstanceOf(ServerError);
      expect(result.httpStatusCode).toBe(422);
      expect(result.message).toContain('test origin');
      expect(result.requestData).toEqual(serverErrorData.requestData);
    });

    it('should convert AxiosError with generic response', () => {
      // Create a proper AxiosError instance
      const axiosError = new AxiosError('Not Found');
      axiosError.response = {
        data: { message: 'Not found' },
        status: 404,
        statusText: 'Not Found',
        headers: {},
        config: {} as any,
      };

      const result = Helper.convertToServerError(axiosError, 'test origin');

      expect(result).toBeInstanceOf(ServerError);
      expect(result.httpStatusCode).toBe(404);
      expect(result.requestData.requestID).toBe('test origin');
      expect(result.message).toContain('Not found');
    });

    it('should convert AxiosError without response', () => {
      // Create a proper AxiosError instance without response
      const axiosError = new AxiosError('Network connection failed');

      const result = Helper.convertToServerError(axiosError, 'network test');

      expect(result).toBeInstanceOf(ServerError);
      expect(result.httpStatusCode).toBe(500);
      expect(result.message).toContain('network test');
    });

    it('should convert generic error to ServerError', () => {
      const genericError = new Error('Something went wrong');

      const result = Helper.convertToServerError(genericError, 'generic test');

      expect(result).toBeInstanceOf(ServerError);
      expect(result.httpStatusCode).toBe(500);
      expect(result.message).toContain('generic test');
      expect(result.error.validation?.[0]?.field).toBe('Error');
      expect(result.error.validation?.[0]?.message).toBe('Something went wrong');
    });

    it('should convert unknown error to ServerError', () => {
      const unknownError = { someProperty: 'value' };

      const result = Helper.convertToServerError(unknownError, 'unknown test');

      expect(result).toBeInstanceOf(ServerError);
      expect(result.httpStatusCode).toBe(500);
      expect(result.message).toContain('unknown test');
    });
  });

  describe('hydrateRequestData', () => {
    it('should create RequestData from valid input', () => {
      const input = { requestID: 'req-123', link: 'https://test.com' };
      const result = Helper.hydrateRequestData(input);

      expect(result).toEqual({
        requestID: 'req-123',
        link: 'https://test.com',
      });
    });

    it('should throw error for missing keys', () => {
      const incompleteInput = { requestID: 'req-123' };

      expect(() => Helper.hydrateRequestData(incompleteInput)).toThrow(BaseError);
    });
  });

  describe('hydrateResponse', () => {
    it('should create GenericRsp from ServerErrorType', () => {
      const serverErrorData: ServerErrorType = {
        httpStatusCode: 200,
        message: 'Success',
        requestData: { requestID: 'req-success', link: 'https://success.com' },
        runtime: 0.5,
        error: {},
      };

      const result = Helper.hydrateResponse(serverErrorData);

      expect(result.httpStatusCode).toBe(200);
      expect(result.message).toBe('Success');
      expect(result.requestData).toEqual({
        requestID: 'req-success',
        link: 'https://success.com',
      });
      expect(result.runtime).toBe(0.5);
    });

    it('should throw error for missing required keys', () => {
      const incompleteData = {
        httpStatusCode: 200,
        message: 'Success',
      } as ServerErrorType;

      expect(() => Helper.hydrateResponse(incompleteData)).toThrow(BaseError);
    });
  });
});
