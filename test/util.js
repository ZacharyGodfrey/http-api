const { expect } = require('chai');

const util = require('../src/util');

describe('src/util.js', () => {
	describe('hmac()', () => {
		it('should return a 64 character string', () => {
			const expected = 64;
			const actual = util.hmac('secret', 'value').length;

			expect(actual).to.eq(expected)
		});
	});

	describe('uuid()', () => {
		it('should return a 36 character string', () => {
			const expected = 36;
			const actual = util.uuid().length;

			expect(actual).to.eq(expected)
		});
	});
});