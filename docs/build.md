# Build Process

The Corbado Node.js SDK uses a Makefile to manage its build process. The Makefile contains several targets that perform different tasks such as building the project, running tests, and cleaning up build artifacts.

## Key Targets in the Makefile

1. **all**: This is the default target. It depends on the build target.
2. **build**: This target depends on the `cjs/build` and `esm/build` targets. It builds the project in both CommonJS and ES Module formats.
3. **cjs/build**: This target compiles the TypeScript source files to CommonJS format using the TypeScript [cjs output configuration file](../tsconfig.cjs.json). It also creates a `package.json` file in the `cjs` directory with the type set to "commonjs".
4. **esm/build**: This target compiles the TypeScript source files to ES Module format using the TypeScript [esm output configuration file](../tsconfig.esm.json). It also creates a `package.json` file in the `esm` directory with the type set to "module".
5. **test**: This target runs the tests using Jest.
6. **clean**: This target removes the `esm`, `cjs`, and `$(TARGET_DIR)` directories.
7. **lint**: This target runs ESLint on the source and test files.
8. **fix**: This target runs ESLint on the source and test files and automatically fixes any fixable problems.
9. **start**: This target depends on the build target. It's used to start the project.
10. **openapi_generate**: This target generates the API code from the OpenAPI specification file using the OpenAPI Generator.

## Building the Project

To build the project, you can run the following command:

```bash
npm build
```

This command runs the build target, which in turn runs the `cjs/build` and `esm/build targets`. These targets compile the TypeScript source files to CommonJS and ES Module formats, respectively.

The compiled files are placed in the `cjs` and `esm` directories. These directories also contain a `package.json` file with the type set to "commonjs" or "module", respectively.

This build process ensures that the project is properly compiled and ready for use in both CommonJS and ES Module environments.

## Notes

Because of inherent issues between ESM and CJS, a number of important decisions were made in the project.

### Extensions in Imports

All local TypeScript imports had to change from:

```javascript
import AuthToken from './authokenService';
```

to:

```javascript
import AuthToken from './authokenService.js';
```

This is because ESM requires extensions, whereas CommonJS doesn't. So building both ESM and CJS modules from our codebase requires importing files with their file extension.

Note also that we're importing `authokenService.js` even though the file is actually `authokenService.ts`. This is because CJS modules will be incorrectly built with `.ts` file extensions unless we indicate `.js` as the extension ahead of time. Sadly, there is currently no TypeScript setting to automate this extension conversion.

❗

> This is why you must manually update file references in the [src/generated](../src/generated/) folder from _*filename*_ to _*filename.js*_ each time you run _npm generate-openapi_, _**before**_ building the esm and cjs modules.

### Directory imports

In CJS, you can import a directory, and if an index.js exists in that directory, it will be used. ESM requires exact paths, so our statement:

```javascript
import { AuthToken } from './controllers';
```

had to become:

```javascript
import { AuthToken } from './services/index.js';
```

These notes are important, failing to follow them will result in an improperly build package which will not be fit for purpose.
