# Code Structure

The Corbado Node.js SDK is organized into several directories and files, each serving a specific purpose:

## Directory Structure

1. **.github**: Contains GitHub-specific files, such as the pull request template.

2. **.vscode**: Contains configuration files for Visual Studio Code.

3. **.docs**: Contains project documentation.

4. **src**: This is the main directory where the source code of the SDK resides. It contains several folders and a generated subdirectory.

   - **src/errors**: Contains files concerned with creating and catching errors generated elsewhere in the project.
   - **src/generated**: Contains the generated code for the API endpoints, generated from the OpenAPI specification file [backend_api_public.yml](../src/specs/backend_api_public.yml) using the OpenAPI Generator. Includes classes for each API endpoint and models for the request and response objects.
   - **src/specs**: Contains the OpenAPI specification files.
   - **src/helpers**: Contains helper functions and utilities that assist with validations.
   - **src/services**: Hosts the main services upon which the entire project is based.
   - **src/webhook**: Contains files related to all things request and response.

   - **src/config.js**: Contains the Config class, used to configure the SDK. It takes the project ID and API secret as parameters and sets several other properties.

   - **src/sdk.js**: Contains the SDK class, the main entry point for using the SDK. It creates an instance of the Config class and an Axios client for making API requests.

5. **tests**: This directory contains test files for the SDK, written using Jest.

6. **.env**: Used to set environment variables. Not included in the repository, but you can create your own .env file and set the `CORBADO_PROJECT_ID` and `CORBADO_API_SECRET` variables.

7. **makefile**: Contains commands for building the project, running tests, and generating the API code.

8. **package.json**: Contains metadata about the project and its dependencies.

9. **README.md**: Provides an overview of the project and instructions on how to use the SDK.

## Usage Note

Remember, the SDK is designed to be used as a module in other Node.js projects. You can import the SDK class from the `src/sdk.js` file and create an instance with your project ID and API secret.
