const { expect } = require('chai');

const db = require('../src/database')('fake connection string');

describe('database.js', () => {
  describe('when calling db.query()', () => {
    it('should return empty array', () => {
      const expected = [];
      const actual = db.query();

      expect(actual).to.deep.eq(expected);
    });
  });
});