const joi = require('joi');

module.exports = {
  name: 'test',
  authenticate: true,
  validate: async (db, request) => {
    const schema = joi.object({
      abc: joi.number().integer().min(122).max(124),
      def: joi.number().integer().min(455).max(457),
    });

    const result = schema.validate(request.data, {
      abortEarly: false,
      convert: false,
    });

    return (result.error?.details || []).map(x => x.message);
  },
  execute: async (db, request) => {
    return { ...request };
  },
  postHandler: async (db, request, response) => {
    //
  },
};