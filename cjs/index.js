"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCacheMaxAge = exports.DefaultShortSessionCookieName = exports.DefaultFrontendAPI = exports.DefaultBackendAPI = exports.Configuration = exports.SDK = void 0;
const config_js_1 = require("./config.js");
exports.Configuration = config_js_1.default;
Object.defineProperty(exports, "DefaultBackendAPI", { enumerable: true, get: function () { return config_js_1.DefaultBackendAPI; } });
Object.defineProperty(exports, "DefaultCacheMaxAge", { enumerable: true, get: function () { return config_js_1.DefaultCacheMaxAge; } });
Object.defineProperty(exports, "DefaultFrontendAPI", { enumerable: true, get: function () { return config_js_1.DefaultFrontendAPI; } });
Object.defineProperty(exports, "DefaultShortSessionCookieName", { enumerable: true, get: function () { return config_js_1.DefaultShortSessionCookieName; } });
const sdk_js_1 = require("./sdk.js");
exports.SDK = sdk_js_1.default;
//# sourceMappingURL=index.js.map