import User from '../../../src/entities/user.js';
import BaseError from '../../../src/errors/baseError.js';
import httpStatusCodes from '../../../src/errors/httpStatusCodes.js';

describe('User entity', () => {
  let user: User;

  describe('Authenticated user', () => {
    beforeEach(() => {
      user = new User(true);
    });

    it('should create User object with default parameters when only "authenticated" provided', () => {
      expect(user.isAuthenticated()).toBe(true);
      expect(user.getID()).toBe('');
      expect(user.getName()).toBe('');
      expect(user.getEmail()).toBe('');
      expect(user.getPhoneNumber()).toBe('');
    });

    it('should return true when User object is authenticated', () => {
      expect(user.isAuthenticated()).toBe(true);
    });

    it('should return the user ID when User object is authenticated', () => {
      user = new User(true, '123');
      expect(user.getID()).toBe('123');
    });
  });

  describe('Unauthenticated user', () => {
    beforeEach(() => {
      user = new User(false);
    });

    it('should throw BaseError with correct status code and description when User object is not authenticated', () => {
      expect(() => user.getID()).toThrow(BaseError);
      try {
        user.getID();
      } catch (error) {
        expect(error.statusCode).toBe(httpStatusCodes.USER_NOT_AUTHENTICATED.code);
        expect(error.message).toBe(httpStatusCodes.USER_NOT_AUTHENTICATED.description);
      }
    });

    it('should mark BaseError as operational when User object is not authenticated', () => {
      try {
        user.getID();
      } catch (error) {
        expect(error.isOperational).toBe(false);
      }
    });
  });
});
