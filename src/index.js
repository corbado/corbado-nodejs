const DEFAULT_API_VERSION = 'v1';
const DEFAULT_PORT = '8080';
const DEFAULT_TIMEOUT = 80000;


const ALLOWED_CONFIG_PROPERTIES = [
    'apiVersion',
    'typescript',
    'maxNetworkRetries',
    'httpAgent',
    'httpClient',
    'timeout',
    'host',
    'port',
    'protocol',
    'telemetry',
    'appInfo',
    'stripeAccount',
];


exports.printMsg = function() {
    console.log("This is a message from the demo package");
}