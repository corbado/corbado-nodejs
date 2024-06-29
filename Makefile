GEN_DIR := ./.gen
TARGET_DIR_BACKEND := src/generated/backendApi
TARGET_DIR_FRONTEND := src/generated/frontendApi
OPENAPI_BACKEND_SPEC_URL := https://api.corbado.com/docs/api/openapi/backend_api_public.yml
OPENAPI_FRONTEND_SPEC_URL := https://api.corbado.com/docs/api/openapi/frontend_api_public.yml
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
openapi_generate: openapi_generate_backendApi openapi_generate_frontendApi

.PHONY: openapi_generate_backendApi
openapi_generate_backendApi:
	@echo "Generating OpenAPI Backend TypeScript Axios code..."
	@mkdir -p $(GEN_DIR) $(TARGET_DIR_BACKEND)
	@curl -s -o $(GEN_DIR)/backend_api_public.yml $(OPENAPI_BACKEND_SPEC_URL)
	@docker pull openapitools/openapi-generator-cli
	@docker run -v $(GEN_DIR):/local openapitools/openapi-generator-cli generate -g typescript-axios -i /local/backend_api_public.yml -o /local --additional-properties=invokerPackage=Corbado\\Generated
	@cp -r $(GEN_DIR)/* $(TARGET_DIR_BACKEND)
	@rm -rf $(GEN_DIR)
	@echo "OpenAPI TypeScript Axios Backend code generation done!"

.PHONY: openapi_generate_frontendApi
openapi_generate_frontendApi:
	@echo "Generating OpenAPI Frontend TypeScript Axios code..."
	@mkdir -p $(GEN_DIR) $(TARGET_DIR_FRONTEND)
	@curl -s -o $(GEN_DIR)/frontend_api_public.yml $(OPENAPI_FRONTEND_SPEC_URL)
	@docker pull openapitools/openapi-generator-cli
	@docker run -v $(GEN_DIR):/local openapitools/openapi-generator-cli generate -g typescript-axios -i /local/frontend_api_public.yml -o /local --additional-properties=invokerPackage=Corbado\\Generated
	@cp -r $(GEN_DIR)/* $(TARGET_DIR_FRONTEND)
	@rm -rf $(GEN_DIR)
	@echo "OpenAPI TypeScript Axios Frontend code generation done!"

.PHONY:clean
clean:
	rm -rf esm cjs $(TARGET_DIR_BACKEND)

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
