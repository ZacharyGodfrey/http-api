const { createHmac } = require('crypto');
const { v4 } = require('uuid');

exports.hmac = (secret, value) => createHmac('sha256', secret).update(value).digest('hex');

exports.uuid = () => v4();