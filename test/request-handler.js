const { expect } = require('chai');

const createHandler = require('../src/request-handler');

const env = {
	dbConnectionString: 'fake-connection-string',
	useConsole: true,
	environment: 'local',
	port: 8080
};

const context = {
	db: require('../src/database')(env),
	logger: require('../src/logger')(env),
	http: require('../src/http')(env)
};

const action = {
	name: 'test-action',
	authenticate: false,
	validate: async (db, request) => ([]),
	execute: async (db, request) => ({ ...request })
};

const handleRequest = createHandler(context, [action]);

describe('src/request-handler.js', () => {
	describe('when the requested action does not exist', () => {
		it('should return notFound()', async () => {
			const actual = await handleRequest({
				actionName: 'fake-action'
			});

			expect(actual).to.deep.eq(context.http.response.notFound());
		});
	});
});