import { SDK, Configuration as Config } from '../../src';
import { User } from '../../src/services';
import { BaseError, httpStatusCodes } from '../../src/errors';

class Utils {
  public static SDK(): SDK {
    const config = new Config(this.getEnv('PROJECT_ID'), this.getEnv('API_SECRET'));

    return new SDK(config);
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
    return `integration-test-${this.generateString(10)}@corbado.com`;
  }

  public static createRandomTestPhoneNumber(): string {
    return `+491509${this.generateNumber(7)}`;
  }

  public static async createUser(): Promise<string> {
    const config = new Config(this.getEnv('CORBADO_PROJECT_ID'), this.getEnv('CORBADO_API_SECRET'));
    const Userfactory = new User(this.SDK().createClient(config));

    const rsp = await Userfactory.create({
      name: this.createRandomTestName(),
      email: this.createRandomTestEmail(),
      phoneNumber: this.createRandomTestPhoneNumber(),
    });

    return rsp.data.userID;
  }
}

export default Utils;
