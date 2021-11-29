import { configureStore } from '@reduxjs/toolkit';

const files = require.context('.', true, /\.js$/);
const reducer = {};
const excludedFiles = ['./index.js', './utils.js', './actionTypes.js'];

files.keys().forEach((key) => {
  if (excludedFiles.includes(key)) return;

  const reduxObj = files(key);

  reducer[key.replace(/(\.\/|\.js)/g, '')] = reduxObj.default;
});

export default configureStore({ reducer });
