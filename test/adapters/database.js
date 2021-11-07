const { expect } = require('chai');

const db = require('../../src/adapters/database')('fake connection string');

describe('src/adapters/database.js', () => {
  describe('when calling db.query()', () => {
    it('should return empty array', () => {
      const expected = [];
      const actual = db.query();

      expect(actual).to.deep.eq(expected);
    });
  });
});