const fs = require('fs-extra');
const path = require('path');
const express = require('express');
const router = express.Router();
const { http } = require('../constants');

const allowMethods = [http.get, http.post];

const getHandlerPath = (routesDir, filename) => {
  return path.resolve(routesDir, filename);
};

const getRouteHandlers = (routesDir) => {
  return fs.readdirSync(routesDir).filter((file) => {
    return file !== 'index.js';
  });
};

const setRouter = (routesDir) => {
  const routeHandlers = getRouteHandlers(routesDir);

  if (!routeHandlers) {
    return;
  }

  routeHandlers.forEach((file) => {
    const [filename, ext] = file.split('.');

    if (!ext) {
      // when there's no file extension
      // value of 'filename' is actually a directory
      const dir = path.resolve(routesDir, filename);
      setRouter(dir);
      return;
    }

    const handlerPath = getHandlerPath(routesDir, filename);
    const { method, route, handler } = require(handlerPath);

    if (!allowMethods.includes(method)) {
      throw new Error(`Method ${method} is not allowed.`);
    }

    router[method](route, handler);
  });
};

setRouter(__dirname);

module.exports = router;
