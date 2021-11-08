module.exports = (connectionString) => {
  return {
    userByToken: async (token) => {
      return {
        id: token
      };
    }
  };
};