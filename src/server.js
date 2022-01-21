const express = require('express');

module.exports = (context, requestHandler) => {
	const { logger, http } = context;
	const server = express();

	server.set('json spaces', 2);
	server.use(express.urlencoded({ extended: false }));
	server.use(express.json());

	// CORS
	server.use((req, res, next) => {
		// Allow CORS
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', '*');
		res.header('Access-Control-Allow-Methods', 'GET,POST');

		// Remove headers that leak information
		res.removeHeader('x-powered-by');

		// Handle OPTIONS requests
		if (req.method === 'OPTIONS') {
			res.status(200).end();
		} else {
			next();
		}
	});

	// Request Handler
	server.post('/:actionName', async (req, res, next) => {
		try {
			logger.info(`REQUEST /${req.params.actionName}\n${JSON.stringify(req.body, null, 2)}`);

			const { token, data } = req.body;
			const request = http.request(req.params.actionName, token || '', data);
			const { status, body } = await requestHandler(request);

			res.status(status).json(body);
		} catch (error) {
			const { message } = error;
			const { status, body } = http.response.serverError(message);

			logger.error(message);
			res.status(status).json(body);
		} finally {
			logger.info(`RESPONSE\n${JSON.stringify(req.body, null, 2)}`);
		}
	});

	// 404
	server.use((req, res) => {
		const { status, body } = http.response.notFound();

		res.status(status).json(body);
	});

	return server;
};