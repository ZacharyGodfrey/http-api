const { expect } = require('chai');

const db = require('../src/database')({
	dbUrl: 'fake-connection-string'
});

describe('src/database.js', () => {
	describe('when calling db.userByToken()', () => {
		it('should return null', async () => {
			const expected = null;
			const actual = await db.userByToken('fake token');

			expect(actual).to.eq(expected);
		});
	});
});