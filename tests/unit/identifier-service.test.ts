import IdentifierService from '../../src/services/identifierService.js';
import { BaseError } from '../../src/errors/index.js';
import {
  IdentifierCreateReq,
  IdentifierType,
  IdentifierStatus,
  IdentifierUpdateReq,
  Identifier as IdentifierRsp,
  GenericRsp,
  IdentifierList,
} from '../../src/generated/index.js';
import Utils from '../utils.js';

describe('IdentifierService Unit Tests', () => {
  let identifierService: IdentifierService;
  let mockAxiosInstance: any;

  beforeEach(() => {
    const { axiosInstance, mock } = Utils.MockAxiosInstance();
    mockAxiosInstance = mock;
    identifierService = new IdentifierService(axiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance.reset();
  });

  describe('constructor', () => {
    it('should throw error when axios instance is null', () => {
      expect(() => new IdentifierService(null as any)).toThrow(BaseError);
    });

    it('should create IdentifierService instance with valid axios', () => {
      const { axiosInstance } = Utils.MockAxiosInstance();
      const service = new IdentifierService(axiosInstance);
      expect(service).toBeInstanceOf(IdentifierService);
    });
  });

  describe('create', () => {
    const validCreateRequest: IdentifierCreateReq = {
      identifierType: IdentifierType.Email,
      identifierValue: 'test@example.com',
      status: IdentifierStatus.Primary,
    };

    const mockIdentifierResponse: IdentifierRsp = {
      identifierID: 'idf-123',
      userID: 'usr-456',
      type: IdentifierType.Email,
      value: 'test@example.com',
      status: IdentifierStatus.Primary,
    };

    it('should create identifier successfully', async () => {
      mockAxiosInstance.onPost().reply(200, mockIdentifierResponse);

      const result = await identifierService.create('usr-456', validCreateRequest);

      expect(result).toEqual(mockIdentifierResponse);
    });

    it('should throw error for null request', async () => {
      await expect(identifierService.create('usr-456', null as any)).rejects.toThrow();
    });

    it('should handle error response from API', async () => {
      const errorResponse = { error: 'Identifier creation failed' };
      mockAxiosInstance.onPost().reply(200, errorResponse);

      await expect(identifierService.create('usr-456', validCreateRequest)).rejects.toThrow();
    });

    it('should handle network errors during creation', async () => {
      mockAxiosInstance.onPost().networkError();

      await expect(identifierService.create('usr-456', validCreateRequest)).rejects.toThrow();
    });
  });

  describe('delete', () => {
    const mockDeleteResponse: GenericRsp = {
      httpStatusCode: 200,
      message: 'Identifier deleted successfully',
      requestData: { requestID: 'req-123', link: '' },
      runtime: 0.5,
    };

    it('should delete identifier successfully', async () => {
      mockAxiosInstance.onDelete().reply(200, mockDeleteResponse);

      const result = await identifierService.delete('usr-123', 'idf-456');

      expect(result).toEqual(mockDeleteResponse);
    });

    it('should throw error for empty userId', async () => {
      await expect(identifierService.delete('', 'idf-456')).rejects.toThrow();
    });

    it('should throw error for empty identifierId', async () => {
      await expect(identifierService.delete('usr-123', '')).rejects.toThrow();
    });

    it('should handle error response from delete API', async () => {
      const errorResponse = { error: 'Delete failed' };
      mockAxiosInstance.onDelete().reply(200, errorResponse);

      await expect(identifierService.delete('usr-123', 'idf-456')).rejects.toThrow();
    });

    it('should handle network errors during deletion', async () => {
      mockAxiosInstance.onDelete().networkError();

      await expect(identifierService.delete('usr-123', 'idf-456')).rejects.toThrow();
    });
  });

  describe('list', () => {
    const mockListResponse: IdentifierList = {
      identifiers: [
        {
          identifierID: 'idf-123',
          userID: 'usr-456',
          type: IdentifierType.Email,
          value: 'test@example.com',
          status: IdentifierStatus.Primary,
        },
      ],
      paging: {
        page: 1,
        totalPages: 1,
        totalItems: 1,
      },
    };

    it('should list identifiers with default parameters', async () => {
      mockAxiosInstance.onGet().reply(200, mockListResponse);

      const result = await identifierService.list();

      expect(result).toEqual(mockListResponse);
    });

    it('should list identifiers with custom parameters', async () => {
      mockAxiosInstance.onGet().reply(200, mockListResponse);

      const result = await identifierService.list(['filter1'], 'created:asc', 2, 20);

      expect(result).toEqual(mockListResponse);
    });

    it('should handle error response from API', async () => {
      const errorResponse = { error: 'List failed' };
      mockAxiosInstance.onGet().reply(200, errorResponse);

      await expect(identifierService.list()).rejects.toThrow();
    });
  });

  describe('listByValueAndType', () => {
    const mockListResponse: IdentifierList = {
      identifiers: [],
      paging: { page: 1, totalPages: 0, totalItems: 0 },
    };

    it('should list identifiers by value and type', async () => {
      mockAxiosInstance.onGet().reply(200, mockListResponse);

      const result = await identifierService.listByValueAndType('test@example.com', IdentifierType.Email);

      expect(result).toEqual(mockListResponse);
    });
  });

  describe('listByUserId', () => {
    const mockListResponse: IdentifierList = {
      identifiers: [],
      paging: { page: 1, totalPages: 0, totalItems: 0 },
    };

    it('should list identifiers by userId with prefix', async () => {
      mockAxiosInstance.onGet().reply(200, mockListResponse);

      const result = await identifierService.listByUserId('usr-123');

      expect(result).toEqual(mockListResponse);
    });

    it('should list identifiers by userId without prefix', async () => {
      mockAxiosInstance.onGet().reply(200, mockListResponse);

      const result = await identifierService.listByUserId('123');

      expect(result).toEqual(mockListResponse);
    });
  });

  describe('listByUserIdAndType', () => {
    const mockListResponse: IdentifierList = {
      identifiers: [],
      paging: { page: 1, totalPages: 0, totalItems: 0 },
    };

    it('should list identifiers by userId and type with prefix', async () => {
      mockAxiosInstance.onGet().reply(200, mockListResponse);

      const result = await identifierService.listByUserIdAndType('usr-123', IdentifierType.Email);

      expect(result).toEqual(mockListResponse);
    });

    it('should list identifiers by userId and type without prefix', async () => {
      mockAxiosInstance.onGet().reply(200, mockListResponse);

      const result = await identifierService.listByUserIdAndType('123', IdentifierType.Email);

      expect(result).toEqual(mockListResponse);
    });
  });

  describe('updateIdentifier', () => {
    const validUpdateRequest: IdentifierUpdateReq = { status: IdentifierStatus.Verified };

    const mockIdentifierResponse: IdentifierRsp = {
      identifierID: 'idf-123',
      userID: 'usr-456',
      type: IdentifierType.Email,
      value: 'test@example.com',
      status: IdentifierStatus.Verified,
    };

    it('should update identifier successfully', async () => {
      mockAxiosInstance.onAny().reply(200, mockIdentifierResponse);

      const result = await identifierService.updateIdentifier('usr-456', 'idf-123', validUpdateRequest);

      expect(result).toEqual(mockIdentifierResponse);
    });

    it('should throw error for empty userId', async () => {
      await expect(identifierService.updateIdentifier('', 'idf-123', validUpdateRequest)).rejects.toThrow();
    });

    it('should throw error for empty identifierId', async () => {
      await expect(identifierService.updateIdentifier('usr-456', '', validUpdateRequest)).rejects.toThrow();
    });

    it('should throw error for null update request', async () => {
      await expect(identifierService.updateIdentifier('usr-456', 'idf-123', null as any)).rejects.toThrow();
    });
  });

  describe('updateStatus', () => {
    const mockIdentifierResponse: IdentifierRsp = {
      identifierID: 'idf-123',
      userID: 'usr-456',
      type: IdentifierType.Email,
      value: 'test@example.com',
      status: IdentifierStatus.Verified,
    };

    it('should update identifier status successfully', async () => {
      mockAxiosInstance.onAny().reply(200, mockIdentifierResponse);

      const result = await identifierService.updateStatus('usr-456', 'idf-123', IdentifierStatus.Verified);

      expect(result).toEqual(mockIdentifierResponse);
    });
  });
});
