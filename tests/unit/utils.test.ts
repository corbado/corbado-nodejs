import Utils from '../utils.js';

describe('Utils Class', () => {
  it('should create SDK instance', () => {
    const sdk = Utils.SDK();
    expect(sdk).toBeDefined();
  });

  it('should create Axios instance', () => {
    const instance = Utils.AxiosInstance();
    expect(instance).toBeDefined();
    expect(instance.defaults.baseURL).toBe(process.env.CORBADO_BACKEND_API);
  });

  it('should create mock Axios instance', () => {
    const { axiosInstance, mock } = Utils.MockAxiosInstance();
    expect(axiosInstance).toBeDefined();
    expect(mock).toBeDefined();
  });

  it('should generate random test data', () => {
    const name = Utils.createRandomTestName();
    const email = Utils.createRandomTestEmail();

    expect(name).toBeDefined();
    expect(name.length).toBeGreaterThan(0);
    expect(email).toMatch(/@corbado\.com$/);
  });
});
