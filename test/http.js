const { expect } = require('chai');

const createHttp = require('../src/http');

const http = createHttp({ environment: 'local' });

describe('src/http.js', () => {
	describe('request()', () => {
		it('should create a valid request object', () => {
			const actionName = 'fake-name';
			const token = 'fake-token';
			const data = { abc: 123 };
			const actual = http.request(actionName, token, data);

			expect(actual.actionName).to.eq(actionName);
			expect(actual.token).to.eq(token);
			expect(actual.data).to.deep.eq(data);
		});
	});

	describe('response', () => {
		describe('success()', () => {
			describe('when no data is specified', () => {
				it('should return status code 200', () => {
					const statusCode = 200;
					const actual = http.response.success();

					expect(actual.status).to.eq(statusCode);
					expect(actual.body.data).to.eq(null);
				});
			});

			describe('when data is specified', () => {
				it('should return status code 200', () => {
					const statusCode = 200;
					const data = { abc: 123 };
					const actual = http.response.success(data);

					expect(actual.status).to.eq(statusCode);
					expect(actual.body.data).to.eq(data);
				});
			});
		});

		describe('badRequest()', () => {
			it('should return status code 400', () => {
				const statusCode = 400;
				const messages = ['Fake Error'];
				const actual = http.response.badRequest(messages);

				expect(actual.status).to.eq(statusCode);
				expect(actual.body.messages).to.deep.eq(messages);
			});
		});

		describe('notAuthorized()', () => {
			it('should return status code 401', () => {
				const statusCode = 401;
				const actual = http.response.notAuthorized();

				expect(actual.status).to.eq(statusCode);
			});
		});

		describe('forbidden()', () => {
			it('should return status code 403', () => {
				const statusCode = 403;
				const actual = http.response.forbidden();

				expect(actual.status).to.eq(statusCode);
			});
		});

		describe('notFound()', () => {
			it('should return status code 404', () => {
				const statusCode = 404;
				const actual = http.response.notFound();

				expect(actual.status).to.eq(statusCode);
			});
		});

		describe('serverError()', () => {
			it('should return status code 500', () => {
				const expected = 500;
				const actual = http.response.serverError('Fake Error');

				expect(actual.status).to.eq(expected);
			});

			describe('when environment is not production', () => {
				it('should return the given error message', () => {
					const errorMessage = 'Fake Error';
					const actual = http.response.serverError(errorMessage);

					expect(actual.body.messages[0]).to.eq(errorMessage);
				});
			});

			describe('when environment is production', () => {
				it('should not return the given error message', () => {
					const errorMessage = 'Fake Error';
					const httpProd = createHttp({ environment: 'production' });
					const actual = httpProd.response.serverError(errorMessage);

					expect(actual.body.messages[0]).to.not.eq(errorMessage);
				});
			});
		});
	});
});