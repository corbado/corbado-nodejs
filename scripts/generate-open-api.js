import { execSync } from 'child_process';
import { rmSync, mkdirSync, existsSync, cpSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

console.log('Generating OpenAPI code ...');

// Function to run shell commands
function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute command: ${command}`, error);
  }
}

// Function to change directory
function changeDirectory(targetDir) {
  try {
    process.chdir(targetDir);
    console.log(`New directory: ${process.cwd()}`);
  } catch (error) {
    console.error(`Failed to change directory to ${targetDir}`, error);
  }
}

const __filename = fileURLToPath(import.meta.url);
const scriptDir = dirname(__filename);
const genDir = join(scriptDir, '.gen');

// Remove and recreate .gen directory
rmSync(genDir, { recursive: true, force: true });
mkdirSync(genDir, { recursive: true });

changeDirectory(genDir);

// Download the OpenAPI specification
runCommand('curl -s -O https://api.corbado.com/docs/api/openapi/backend_api_public.yml');

// Pull and run the OpenAPI generator Docker image
runCommand('docker pull openapitools/openapi-generator-cli');
runCommand(
  `docker run -v ${process.cwd()}:/local openapitools/openapi-generator-cli generate -i /local/backend_api_public.yml -g nodejs-express-server -o /local --additional-properties=invokerPackage=Corbado\\Generated`,
);

// Copy generated files to the desired location
const libDir = join(genDir);

if (existsSync(libDir)) {
  const targetDir = join(scriptDir, '..', 'src', 'generated');
  mkdirSync(targetDir, { recursive: true });
  cpSync(libDir, targetDir, { recursive: true });
}

changeDirectory(scriptDir);

// Clean up
rmSync(genDir, { recursive: true, force: true });

console.log(' done!');
