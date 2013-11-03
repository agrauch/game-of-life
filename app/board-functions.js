// Functions for manipulating a game of life board
var _ = require('underscore'),
    minLength = 2;

function allRowsMeetCriteria (board, rowCriteria) {
  return _.every(board, function (row) {
    return rowCriteria(row);
  });
}

function validateEqualRows (board) {
  return allRowsMeetCriteria(board, function (row) { 
    return row.length == _.first(board).length;
  });
}

function validateBoardSize (board) {
  return board.length == minLength && allRowsMeetCriteria(board, function (row) {
    return row.length >= minLength;
  });
}

module.exports.validateBoard = function (board) {
  return validateEqualRows(board) && validateBoardSize(board);
};