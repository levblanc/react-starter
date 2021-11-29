// https://webpack.js.org/guides/dependency-management/#context-module-api

const indexer = (dir) => {
  let requireFiles;
  const interceptors = {};

  // https://webpack.js.org/guides/dependency-management/#require-context
  // The arguments passed to require.context must be literals
  if (dir === 'request') {
    requireFiles = require.context('./request', false, /\.js$/);
  } else {
    requireFiles = require.context('./response', false, /\.js$/);
  }

  requireFiles.keys().forEach((file) => {
    const key = file.replace(/(\.\/|\.js)/g, '');
    interceptors[key] = requireFiles(file).default;
  });

  return interceptors;
};

export const reqInterceptors = indexer('request');
export const resInterceptors = indexer('response');
