import Utils from '../utils.js';
import { SDK } from '../../src/index.js';

describe('Services Coverage', () => {
  let sdk: SDK;

  beforeEach(() => {
    sdk = Utils.SDK();
  });

  it('should return session service instance', () => {
    const sessions = sdk.sessions();
    expect(sessions).toBeDefined();
    expect(typeof sessions.validateToken).toBe('function');
  });

  it('should return user service instance', () => {
    const users = sdk.users();
    expect(users).toBeDefined();
  });

  it('should return identifier service instance', () => {
    const identifiers = sdk.identifiers();
    expect(identifiers).toBeDefined();
  });
});
