GEN_DIR := ./.gen
TARGET_DIR := src/generated
OPENAPI_SPEC_URL := https://api.corbado.com/docs/api/openapi/backend_api_public.yml
OPENAPI_IMAGE := openapitools/openapi-generator-cli
SOURCE_FILES := $(shell find src/ -type f -name '*.ts')

.PHONY:all
all: build

.PHONY:build
build: cjs/build esm/build

.PHONY:lint
lint:
	npx eslint --quiet 'src/**/*.ts' 'tests/**/*.ts'

.PHONY:lint-fix
lint-fix: fix

.PHONY:fix
fix:
	npx eslint --quiet 'src/**/*.ts' 'tests/**/*.ts' --fix

.PHONY:watch
watch:
	npx tsc --watch

.PHONY:start
start: build

.PHONY: openapi_generate
openapi_generate:
	npx @openapitools/openapi-generator-cli generate -i src/specs/backend_api_public_v2.yml -g typescript-axios -o src/generated_v2 --additional-properties=supportsES6=true

.PHONY:clean
clean:
	rm -rf esm cjs $(TARGET_DIR)

.PHONY: test
test:
	@npx jest --coverage

.PHONY: cjs/build
cjs/build: $(SOURCE_FILES)
	npx tsc -p tsconfig.cjs.json
	echo '{"type": "commonjs"}' > cjs/package.json
	@# Creating a small file to keep track of the last build time
	touch cjs/build

.PHONY: esm/build
esm/build: $(SOURCE_FILES)
	npx tsc -p tsconfig.esm.json
	echo '{"type": "module"}' > esm/package.json
	@# Creating a small file to keep track of the last build time
	touch esm/build
