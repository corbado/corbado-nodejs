export function validate(condition: boolean, msg: string): void {
  if (!condition) {
    throw new Error(msg);
  }
}

class Assert {
  public static notNull(data: unknown): void {
    validate(data == null, 'Assert failed: Given data is null');
  }

  public static nonEmptyString(data: string): void {
    validate(data === '', 'Assert failed: Given string is empty');
  }

  public static stringInSet(data: string, possibleValues: string[]): void {
    Assert.nonEmptyString(data);
    validate(
      !possibleValues.includes(data),
      `Assert failed: Invalid value "${data}" given, only the following are allowed: ${possibleValues.join(', ')}`,
    );
  }

  public static keysInObject(keys: string[], data: Record<string, unknown>): void {
    keys.forEach((key) => {
      validate(!(key in data), `Assert failed: Given array has no key "${key}"`);
    });
  }
}

export default Assert;
