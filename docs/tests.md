# Testing Framework

## Overview

The Corbado Node.js SDK leverages Jest, a powerful and widely-used JavaScript testing framework, to conduct thorough unit and integration tests. These tests play a crucial role in ensuring the reliability and robustness of the SDK.

## Test Structure

- **Location**: All tests are housed within the `tests` directory, neatly organized into `unit` and `integration` subdirectories for clarity.
- **Utilities**: The tests utilize the `Utils` class from [tests/utils.ts](../tests/utils.ts) to generate test data and SDK instances. This class includes helpful methods like `createUser`, `createRandomTestName`, and `createRandomTestEmail`.

## Running Tests

### Prerequisites

Ensure that Jest is installed, which is typically done during the initial project setup.

### Execution

Run the tests with the following command:

```bash
npm test
```

This command triggers the test script in the [package.json file](../package.json), which executes the Jest tests.

## Example Test Suite

Consider this example of a test suite from [tests/sdk.test.ts](../tests/sdk.test.ts):

```javascript
describe('SDK class', () => {
  let projectID;
  let apiSecret;
  let config: Configuration;
  let sdk: SDK;

  beforeEach(() => {
    projectID = process.env.CORBADO_PROJECT_ID;
    apiSecret = process.env.CORBADO_API_SECRET;

    if (!projectID || !apiSecret) {
      throw new BaseError('Env Error', 5001, 'Both projectID and apiSecret must be defined', true);
    }

    config = new Configuration(projectID, apiSecret);
    sdk = new SDK(config);
  });

  it('should instantiate SDK with Configuration object', () => {
    expect(sdk).toBeDefined();
  });

  // Other tests...
});
```

This suite focuses on the SDK class, beginning with initialization in the `beforeEach` block, followed by various test cases assessing different SDK functionalities.

## Environment Variables

Before running tests, ensure that `CORBADO_PROJECT_ID` and `CORBADO_API_SECRET` are set in your `.env` file, as these are crucial for creating the `Config` object in the tests.
