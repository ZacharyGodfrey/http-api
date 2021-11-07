const { createHmac } = require('crypto');
const { v4 } = require('uuid');

const hmac = (secret, value) => createHmac('sha256', secret).update(value).digest('hex');

const uuid = () => v4();

module.exports = {
  hmac,
  uuid,
};