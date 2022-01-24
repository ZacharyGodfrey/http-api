const sinon = require('sinon');
const { expect } = require('chai');
const sandbox = sinon.createSandbox();

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

const actions = {
	'test-auth': {
		name: 'test-auth',
		authenticate: true,
		validate: async (db, request) => ([]),
		execute: async (db, request) => ({ ...request })
	},
	'test-no-auth': {
		name: 'test-no-auth',
		authenticate: false,
		validate: async (db, request) => ([]),
		execute: async (db, request) => ({ ...request })
	}
};

const handleRequest = createHandler(context, [action]);

describe('src/request-handler.js', () => {
	afterEach(() => {
		sandbox.restore();
	});

	describe('when the requested action does not exist', () => {
		it('should return notFound()', async () => {
			const actual = await handleRequest({
				actionName: 'fake-action'
			});

			expect(actual).to.deep.eq(context.http.response.notFound());
		});
	});

	describe('when the action requires authentication', () => {
		describe('when the request is missing a token', () => {
			it('should return notAuthorized()', async () => {
				const actual = await handleRequest({
					actionName: 'test-auth',
					token: null
				});

				expect(actual).to.deep.eq(context.http.response.notAuthorized());
			});
		});

		describe('when the user is not found', () => {
			it('should return badRequest()', async () => {
				sandbox.stub(context.db, 'userByToken').resolves(null);

				const actual = await handleRequest({
					actionName: 'test-auth',
					token: 'fake-token'
				});

				expect(actual).to.deep.eq(context.http.response.badRequest(['Invalid Token']));
			});
		});

		describe('when the user is found', () => {
			it('should not return badRequest()', async () => {
				sandbox.stub(context.db, 'userByToken').resolves(null);

				const actual = await handleRequest({
					actionName: 'test-auth',
					token: 'fake-token'
				});

				expect(actual).to.not.deep.eq(context.http.response.badRequest(['Invalid Token']));
			});
		});
	});

	describe('when the request payload is not valid', () => {
		it('should return badRequest()', async () => {
			const errors = ['Fake Error'];

			sandbox.stub(actions['test-no-auth'], 'validate').resolves(errors);

			const actual = await handleRequest({
				actionName: 'test-no-auth'
			});

			expect(actual).to.deep.eq(context.http.response.badRequest(errors));
		});
	});

	describe('when the request payload is valid', () => {
		it('should return success()', async () => {
			const result = { abc: 123 };

			sandbox.stub(actions['test-no-auth'], 'execute').resolves(result);

			const actual = await handleRequest({
				actionName: 'test-no-auth'
			});

			expect(actual).to.deep.eq(context.http.response.success(result));
		});
	});
});