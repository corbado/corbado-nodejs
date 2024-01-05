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
  USER_NOT_AUTHENTICATED: { description: 'User is not authenticated', code: 1001, isOperational: false },
  NULL_DATA: { description: 'Provided data is null', code: 1002, isOperational: false },
  EMPTY_STRING: { description: 'Provided string is empty', code: 1003, isOperational: false },
  INVALID_DATA: { description: 'Provided data is invalid', code: 1004, isOperational: false },
  INVALID_KEY: { description: 'Provided key not found in set', code: 1005, isOperational: false },
  STRINGIFY_FAILURE: { description: 'JSON stringify failed', code: 1006, isOperational: false },
};

const httpStatusCodes = { ...standardStatusCodes, ...customErrorCodes };

export default httpStatusCodes;
