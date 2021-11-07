const { expect } = require('chai');

const helpers = require('../src/helpers');

describe('src/helpers.js', () => {
  describe('hmac()', () => {
    it.only('should return a 64 character string', () => {
      const expected = 64;
      const actual = helpers.hmac('secret', 'value').length;

      expect(actual).to.eq(expected)
    });
  });

  describe('uuid()', () => {
    it.only('should return a 36 character string', () => {
      const expected = 36;
      const actual = helpers.uuid().length;

      expect(actual).to.eq(expected)
    });
  });
});