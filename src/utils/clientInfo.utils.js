module.exports = getClientInfo = (req) => {
    return {
        remoteAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.get('user-agent'),
        origin: req.get('origin')
    };
};
