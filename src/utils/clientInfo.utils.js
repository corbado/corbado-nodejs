module.exports = getClientInfo = (req) => {
    return {
        remoteAddress: getRemoteAddress(req),
        userAgent: req.get('user-agent'),
    };
};

function getRemoteAddress (req) {
    const forwardedFor = req.headers['x-forwarded-for'];

    if (forwardedFor) {
        if (Array.isArray(forwardedFor)) {
            // If 'x-forwarded-for' header is an array, use the first IP address in the array
            return forwardedFor[0].trim();
        } else {
            // If 'x-forwarded-for' header is a string, split it by comma and return the first IP address
            return forwardedFor.split(',')[0].trim();
        }
    }

    // Otherwise, return the IP address from the remote socket
    return req.socket.remoteAddress ?? '';
}

