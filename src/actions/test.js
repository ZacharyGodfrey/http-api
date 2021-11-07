module.exports = {
  name: 'test',
  handler: (db) => ({
    authenticate: true,
    authorize: async (user) => false,
    validate: async (user, requestData) => ['Fake error message.'],
    execute: async (user, requestData) => ({ requestData }),
  }),
};