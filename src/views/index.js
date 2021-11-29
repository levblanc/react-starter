const files = require.context('.', true, /\.js$/);
const views = {};
const excludedFiles = ['./index.js'];

files.keys().forEach((key) => {
  if (excludedFiles.includes(key)) return;

  const view = files(key);

  views[key.replace(/(\.\/|\/index\.js)/g, '')] = view.default;
});

export default views;

