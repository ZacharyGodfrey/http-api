const { expect } = require('chai');

const db = require('../../src/adapters/database')('fake connection string');

describe('src/adapters/database.js', () => {
  describe('when calling db.userByToken()', () => {
    it('should return null', async () => {
      const expected = null;
      const actual = await db.userByToken('fake token');

      expect(actual).to.deep.eq(expected);
    });
  });
});