const { expect } = require('chai');

xdescribe('filename.js', () => {
  describe('when [condition]', () => {
    it('should [expectation]', () => {
      const expected = 1;
      const actual = 1;

      expect(actual).to.eq(actual);
    });
  });
});