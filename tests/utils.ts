import axios, { AxiosInstance } from 'axios';
import { SDK, Configuration as Config } from '../src';
import { BaseError, httpStatusCodes } from '../src/errors';

class Utils {
  public static SDK(): SDK {
    const config = new Config(this.getEnv('CORBADO_PROJECT_ID'), this.getEnv('CORBADO_API_SECRET'));

    return new SDK(config);
  }

  public static AxiosInstance(): AxiosInstance {
    const instance = axios.create({
      baseURL: process.env.CORBADO_BACKEND_API,
      auth: {
        username: process.env.CORBADO_PROJECT_ID!,
        password: process.env.CORBADO_API_SECRET!,
      },
    });

    return instance;
  }

  private static getEnv(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new BaseError(
        `Environment variable ${key} not found`,
        httpStatusCodes.NOT_FOUND.code,
        httpStatusCodes.NOT_FOUND.description,
        httpStatusCodes.NOT_FOUND.isOperational,
      );
    }

    return value;
  }

  public static generateString(length: number): string {
    // Removed I, 1, 0, and O because of risk of confusion
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    const charactersLength = characters.length;

    let result = '';
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  private static generateNumber(length: number): string {
    const characters = '0123456789';
    const charactersLength = characters.length;

    let result = '';
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  public static createRandomTestName(): string {
    return this.generateString(10);
  }

  public static createRandomTestEmail(): string {
    return `integration-test+${this.generateString(10)}@corbado.com`;
  }

  public static createRandomTestEmailID(): string {
    return `eml-${this.generateNumber(11)}`;
  }

  public static createRandomTestPhoneNumber(): string {
    return `+491509${this.generateNumber(7)}`;
  }

  public static async createUser(): Promise<string> {
    const rsp = await this.SDK().getusers().create({
      name: this.createRandomTestName(),
      email: this.createRandomTestEmail(),
      phoneNumber: this.createRandomTestPhoneNumber(),
    });

    return rsp.data.userID;
  }

  public static testConstants = {
    TEST_REMOTE_ADDRESS: '124.0.0.1',
    TEST_USER_AGENT: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    TEST_REDIRECT_URL: 'https://example.com',
    TEST_EMPTY_STRING: '',
    TEST_EMAILLINK_ID: 'eml-123456789',
    TEST_EMAILOTP_ID: 'emc-123456789',
    TEST_SMSOTP_ID: 'sms-123456789',
    TEST_USER_ID: 'usr-123456789',
    TEST_TOKEN: 'fdfdsfdss1fdfdsfdss1',
  };
}

export default Utils;
