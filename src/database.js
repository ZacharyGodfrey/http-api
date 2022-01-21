module.exports = (env) => {
	const { dbConnectionString } = env;

	return {
		userByToken: async (token) => {
			return null;
		}
	};
};