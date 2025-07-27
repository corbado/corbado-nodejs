import { AxiosInstance } from 'axios';
import UserService from '../../src/services/userService.js';
import { BaseError } from '../../src/errors/index.js';
import { UserCreateReq, UserStatus, User, GenericRsp } from '../../src/generated/index.js';
import Utils from '../utils.js';

describe('UserService Unit Tests', () => {
  let userService: UserService;
  let mockAxiosInstance: any;

  beforeEach(() => {
    const { axiosInstance, mock } = Utils.MockAxiosInstance();
    mockAxiosInstance = mock;
    userService = new UserService(axiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance.reset();
  });

  describe('constructor', () => {
    it('should throw error when axios instance is null', () => {
      expect(() => new UserService(null as unknown as AxiosInstance)).toThrow(BaseError);
    });

    it('should create UserService instance with valid axios', () => {
      const { axiosInstance } = Utils.MockAxiosInstance();
      const service = new UserService(axiosInstance);
      expect(service).toBeInstanceOf(UserService);
    });
  });

  describe('create', () => {
    const validUserRequest: UserCreateReq = {
      fullName: 'John Doe',
      status: UserStatus.Active,
    };

    const mockUserResponse: User = {
      userID: 'usr-123',
      fullName: 'John Doe',
      status: UserStatus.Active,
    };

    it('should create user successfully', async () => {
      mockAxiosInstance.onPost().reply(200, mockUserResponse);

      const result = await userService.create(validUserRequest);

      expect(result).toEqual(mockUserResponse);
    });

    it('should throw error for null request', async () => {
      await expect(userService.create(null as unknown as UserCreateReq)).rejects.toThrow();
    });

    it('should throw error for empty fullName', async () => {
      const invalidRequest = { ...validUserRequest, fullName: '' };

      await expect(userService.create(invalidRequest)).rejects.toThrow();
    });

    it('should throw error for null status', async () => {
      const invalidRequest = { ...validUserRequest, status: null as any };

      await expect(userService.create(invalidRequest)).rejects.toThrow();
    });

    it('should handle error response from API', async () => {
      const errorResponse = { error: 'User creation failed' };
      mockAxiosInstance.onPost().reply(200, errorResponse);

      await expect(userService.create(validUserRequest)).rejects.toThrow();
    });

    it('should handle network errors', async () => {
      mockAxiosInstance.onPost().networkError();

      await expect(userService.create(validUserRequest)).rejects.toThrow();
    });
  });

  describe('createActiveByName', () => {
    const mockUserResponse: User = {
      userID: 'usr-456',
      fullName: 'Jane Smith',
      status: UserStatus.Active,
    };

    it('should create active user by name', async () => {
      mockAxiosInstance.onPost().reply(200, mockUserResponse);

      const result = await userService.createActiveByName('Jane Smith');

      expect(result).toEqual(mockUserResponse);
    });

    it('should throw error for empty fullName', async () => {
      await expect(userService.createActiveByName('')).rejects.toThrow();
    });
  });

  describe('delete', () => {
    const mockDeleteResponse: GenericRsp = {
      httpStatusCode: 200,
      message: 'User deleted successfully',
      requestData: { requestID: 'req-123', link: '' },
      runtime: 0.5,
    };

    it('should delete user successfully', async () => {
      mockAxiosInstance.onDelete().reply(200, mockDeleteResponse);

      const result = await userService.delete('usr-123');

      expect(result).toEqual(mockDeleteResponse);
    });

    it('should throw error for empty id', async () => {
      await expect(userService.delete('')).rejects.toThrow();
    });

    it('should handle error response from API', async () => {
      const errorResponse = { error: 'User not found' };
      mockAxiosInstance.onDelete().reply(200, errorResponse);

      await expect(userService.delete('usr-123')).rejects.toThrow();
    });

    it('should handle network errors', async () => {
      mockAxiosInstance.onDelete().networkError();

      await expect(userService.delete('usr-123')).rejects.toThrow();
    });
  });

  describe('get', () => {
    const mockUserResponse: User = {
      userID: 'usr-789',
      fullName: 'Bob Johnson',
      status: UserStatus.Active,
    };

    it('should get user successfully', async () => {
      mockAxiosInstance.onGet().reply(200, mockUserResponse);

      const result = await userService.get('usr-789');

      expect(result).toEqual(mockUserResponse);
    });

    it('should throw error for empty id', async () => {
      await expect(userService.get('')).rejects.toThrow();
    });

    it('should handle error response from API', async () => {
      const errorResponse = { error: 'User not found' };
      mockAxiosInstance.onGet().reply(200, errorResponse);

      await expect(userService.get('usr-789')).rejects.toThrow();
    });

    it('should handle network errors', async () => {
      mockAxiosInstance.onGet().networkError();

      await expect(userService.get('usr-789')).rejects.toThrow();
    });
  });
});
