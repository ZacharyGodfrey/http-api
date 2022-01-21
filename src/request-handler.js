module.exports = (context, actions) => {
	const { db, logger, http } = context;
	const { notFound, notAuthorized, badRequest, success } = http.response;

	return async (request) => {
		const action = actions[request.actionName];

		if (!action) {
			return notFound();
		}

		if (action.authenticate) {
			if (!request.token) {
				return notAuthorized();
			}

			request.user = await db.userByToken(request.token);

			if (!request.user) {
				return badRequest(['Invalid Token']);
			}
		}

		const errors = await action.validate(db, request);

		if (errors.length > 0) {
			return badRequest(errors);
		}

		const result = await action.execute(db, request);

		return success(result);
	};
};