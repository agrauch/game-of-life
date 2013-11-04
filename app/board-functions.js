// Functions for manipulating a game of life board
var _ = require('underscore'),
    minLength = 2;

// Validation helpers
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

// Evolution helpers
function countLiveNeighborsInAdjacentCell (row, cellIndex) {
  return row[cellIndex] || 0;
}

function countLiveNeighborsInAdjacentRow (row, cellIndex) {   
  if (!row) {
    return 0;
  }
  
  return _.reduce(_.range(cellIndex - 1, cellIndex + 2), function (sum, adjacentIndex) {
    return sum + countLiveNeighborsInAdjacentCell(row, adjacentIndex);
  }, 0);
}

// Board API
module.exports.validateBoard = function (board) {
  return validateEqualRows(board) && validateBoardSize(board);
};

module.exports.countLiveNeighbors = function (board, rowIndex, cellIndex) {
  return countLiveNeighborsInAdjacentRow(board[rowIndex - 1], cellIndex) + 
         countLiveNeighborsInAdjacentCell(board[rowIndex], cellIndex - 1) + 
         countLiveNeighborsInAdjacentCell(board[rowIndex], cellIndex + 1) + 
         countLiveNeighborsInAdjacentRow(board[rowIndex + 1], cellIndex); 
};

module.exports.cellIsAliveInNextGeneration = function (board, rowIndex, cellIndex) {
  var neighborCount = this.countLiveNeighbors(board, rowIndex, cellIndex),
      cellIsAlive = board[rowIndex][cellIndex];
  
  // if a live cell has 2 or 3 neighbors, it survives to the next generation
  if (cellIsAlive && (neighborCount == 2 || neighborCount == 3)) {
    return true;
  }
  
  // if a dead cell has 3 neighbors, it reproduces in the next generation
  if (!cellIsAlive && neighborCount == 3) {
    return true;
  }
  
  // all other cells are dead in the next generation
  return false;
};

module.exports.nextGeneration = function (board) {
  var self = this;
  
  return _.map(board, function (row, rowIndex) {
    return _.map(row, function (cell, cellIndex) {
      return self.cellIsAliveInNextGeneration(board, rowIndex, cellIndex) ? 1 : 0;
    });
  });
};