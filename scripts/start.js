const env = {
	dbConnectionString: process.env.DB_CONNECTION,
	useConsole: process.env.LOG_CONSOLE === 'true',
	environment: process.env.NODE_ENV || 'local',
	port: process.env.PORT || 8080
};

const context = {
	db: require('../src/database')(env),
	logger: require('../src/logger')(env),
	http: require('../src/http')(env)
};

const actions = require('../src/actions');
const requestHandler = require('../src/request-handler')(context, actions);
const server = require('../src/server')(context, requestHandler);

server.listen(env.port, () => {
	context.logger.info(`API is listening on port ${env.port}`);
});