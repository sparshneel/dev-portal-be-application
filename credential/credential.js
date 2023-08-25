const { randomBytes } = require('crypto');

const generate_secret = function generateKey(size = 32, format = 'base64') {
    const buffer = crypto.randomBytes(size);
    return buffer.toString(format);
}

module.exports = {
    generate_secret
}