const fs = require('fs-extra');
const path = require('path');

let middlewares = {};

const middlewarePath = (filename) => {
  return path.resolve(__dirname, filename);
};

const middlewareFiles = fs.readdirSync(__dirname).filter((file) => {
  return file !== 'index.js';
});

middlewareFiles.forEach((file) => {
  const [filename] = file.split('.');
  middlewares[filename] = require(middlewarePath(filename));
});

module.exports = middlewares;
