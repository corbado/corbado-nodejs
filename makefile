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
	npx eslint --quiet 'src/**/*.ts' 'test/**/*.ts'

.PHONY:lint-fix
lint-fix: fix

.PHONY:fix
fix:
	npx eslint --quiet 'src/**/*.ts' 'test/**/*.ts' --fix

.PHONY:watch
watch:
	npx tsc --watch

.PHONY:start
start: build

.PHONY: openapi_generate
openapi_generate:
	@echo "Generating OpenAPI code..."
	@mkdir -p $(GEN_DIR) $(TARGET_DIR)
	@curl -s -o $(GEN_DIR)/backend_api_public.yml $(OPENAPI_SPEC_URL)
	@docker pull $(OPENAPI_IMAGE)
	@docker run -v $(GEN_DIR):/local $(OPENAPI_IMAGE) generate -i /local/backend_api_public.yml -g nodejs-express-server -o /local --additional-properties=invokerPackage=Corbado\\Generated
	@cp -r $(GEN_DIR)/* $(TARGET_DIR)
	@rm -rf $(GEN_DIR)
	@echo "OpenAPI code generation done!"

.PHONY:clean
clean:
	rm -rf dist esm cjs cjs-test $(TARGET_DIR)

cjs/build: $(SOURCE_FILES)
	npx tsc --module commonjs --outDir cjs/
	echo '{"type": "commonjs"}' > cjs/package.json
	@# Creating a small file to keep track of the last build time
	touch cjs/build


esm/build: $(SOURCE_FILES)
	npx tsc --module es2022 --outDir esm/
	echo '{"type": "module"}' > esm/package.json
	@# Creating a small file to keep track of the last build time
	touch esm/build