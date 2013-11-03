// Unit tests for game of life functions
var should = require('should');
var boardFunctions = require('../app/board-functions');

describe('board functions', function () {
  describe('validate', function () {
    it('rejects a board with unequally sized rows', function () {
      boardFunctions.validateBoard([[0,1],[0,1,1]]).should.equal(false);
    });
    
    it('accepts a board with equally sized rows', function () {
      boardFunctions.validateBoard([[0,1],[0,1]]).should.equal(true);
    });
    
    it('rejects a board smaller than 2x2', function () {
      boardFunctions.validateBoard([[0]]).should.equal(false);
    });
    
    it('accepts a board larger than 2x2', function () {
      boardFunctions.validateBoard([[0,1],[0,1]]).should.equal(true);
    });
  });
});