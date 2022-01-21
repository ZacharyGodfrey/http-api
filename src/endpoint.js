const { http } = require('./util');

const handleRequest = async (db, action, request) => {
	try {
		if (action.authenticate) {
			if (!request.token) {
				return http.response.badRequest(['Token Required']);
			} else {
				request.user = await db.userByToken(request.token);

				if (!request.user) {
					return http.response.badRequest(['Invalid Token']);
				}
			}
		}

		const errors = await action.validate(db, request);

		if (errors.length > 0) {
			return http.response.badRequest(errors);
		}

		const result = await action.execute(db, request);

		return http.response.success(result);
	} catch (error) {
		return http.response.serverError(error.message);
	}
};

module.exports = (db, actions) => {
	return async (req, res, next) => {
		const action = actions[req.params.actionName];

		if (!action) {
			next();
		} else {
			const request = http.request.fromExpress(req);

			if (action.preHandler) {
				await action.preHandler(db, request);
			}

			const response = await handleRequest(db, action, request);

			if (action.postHandler) {
				await action.postHandler(db, request, response);
			}

			res.status(response.status).json(response.body);
		}
	};
};