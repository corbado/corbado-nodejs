type HttpStatusCode = {
  description: string;
  code: number;
  isOperational: boolean;
};

const standardStatusCodes: Record<string, HttpStatusCode> = {
  OK: { description: 'Ok', code: 200, isOperational: true },
  CREATED: { description: 'Created', code: 201, isOperational: true },
  NO_CONTENT: { description: 'No content', code: 204, isOperational: true },
  BAD_REQUEST: { description: 'Bad request', code: 400, isOperational: true },
  NOT_FOUND: { description: 'Not found', code: 404, isOperational: true },
  INTERNAL_SERVER_ERROR: { description: 'Internal server error', code: 500, isOperational: true },
};

const customErrorCodes: Record<string, HttpStatusCode> = {
  USER_ALREADY_AUTHENTICATED: { description: 'User is already authenticated', code: 1000, isOperational: false },
  USER_NOT_AUTHENTICATED: { description: 'User is not authenticated', code: 1001, isOperational: false },
  NULL_DATA: { description: 'Provided data is null', code: 1002, isOperational: false },
  EMPTY_STRING: { description: 'Provided string is empty', code: 1003, isOperational: false },
  INVALID_DATA: { description: 'Provided data is invalid', code: 1004, isOperational: false },
  INVALID_KEY: { description: 'Provided key not found in set', code: 1005, isOperational: false },
  STRINGIFY_FAILURE: { description: 'JSON stringify failed', code: 1006, isOperational: false },
  AUTH_TOKEN_ERROR: { description: 'Unknown auth error response', code: 1007, isOperational: false },
  AUTH_RSP_ERROR: { description: 'RSP error response', code: 1008, isOperational: false },
  API_RESPONSE_ERROR: { description: 'Response body is noat a string', code: 1009, isOperational: false },
  ISSUER_MISMATCH_ERROR: { description: 'Mismatch in issuer configuration', code: 1010, isOperational: false },
  MISSING_ACTION_HEADER: { description: 'Missing action header (X-CORBADO-ACTION)', code: 1011, isOperational: false },
  INVALID_ACTION_HEADER: { description: 'Missing action header (X-CORBADO-ACTION)', code: 1012, isOperational: false },
  INVALID_URL: { description: 'Provided url is invalid', code: 1013, isOperational: false },
  INVALID_SHORT_SESSION: { description: 'Invalid short session', code: 1014, isOperational: false },
  CLAIM_VALIDATION_FAILED: { description: 'Claim validation failed', code: 1015, isOperational: false },
  JWT_EXPIRED: { description: 'Token is expired', code: 1016, isOperational: false },
  JWT_INVALID: { description: 'Token is invalid', code: 1017, isOperational: false },
  INVALID_ISSUER: { description: 'Invalid Issuer: Issuer does not match', code: 1018, isOperational: false },
};

const httpStatusCodes = { ...standardStatusCodes, ...customErrorCodes };

export default httpStatusCodes;
