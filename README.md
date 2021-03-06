#Game of Life

A simple Node.js application to evolve generations through the "game of life"

## Requirements

[Node.js](http://nodejs.org) and [Grunt](http://gruntjs.com/) must be installed to run unit tests and the application. 

Once Node.js is installed, the Grunt CLI needs to be installed with `npm install -g grunt-cli`.

With the dependencies installed, run `npm install` in the repo directory to set up the project.

## Running Unit Tests

Run `grunt test`

## Running the Application

The script accepts a game board in the form of a 2 dimensional array with a least 2 elements in each row.

Run the script with `node app/app.js [board]`. For example:
```
node app/app.js [[0,1,0,0,0],[1,0,0,1,1],[1,1,0,0,1],[0,1,0,0,0],[1,0,0,0,1]]
```
