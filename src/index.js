const Corbado = require('./corbado')
const Configuration = require("./config/configuration");
const getClientInfo = require("./utils/clientInfo.utils");

module.exports = {
    SDK: Corbado,
    Configuration: Configuration,
    getClientInfo: getClientInfo,
}
