module.exports = (env) => {
	const { dbUrl } = env;

	return {
		userByToken: async (token) => {
			return null;
		}
	};
};