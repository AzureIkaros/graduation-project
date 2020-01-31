const crypto = require('crypto');

module.exports = function checkPassword(secret) {
    return crypto.createHmac('sha256', secret)
        .update('wearefamily')
        .digest('hex');
}