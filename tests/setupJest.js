// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env.test' });

// Set default test environment variables if not already set
if (!process.env.CORBADO_PROJECT_ID) {
  process.env.CORBADO_PROJECT_ID = 'pro-test-123456789';
}
if (!process.env.CORBADO_API_SECRET) {
  process.env.CORBADO_API_SECRET = 'corbado1_test_secret_key_123456789';
}
if (!process.env.CORBADO_FRONTEND_API) {
  process.env.CORBADO_FRONTEND_API = 'https://pro-test-123456789.frontendapi.cloud.corbado.io';
}
if (!process.env.CORBADO_BACKEND_API) {
  process.env.CORBADO_BACKEND_API = 'https://backendapi.cloud.corbado.io';
}

module.exports = {};
