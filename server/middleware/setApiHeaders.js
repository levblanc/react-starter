const setApiHeaders = (option) => (req, res, next) => {
  // TODO: validate options?

  // remove 'X-Powered-By: Express' header
  res.removeHeader('X-Powered-By');

  let headers = {
    'Content-Type': 'application/json',
  };

  const noCacheSettings = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    Pragma: 'no-cache',
    Expires: -1,
  };

  if (process.env.NODE_ENV === 'dev') {
    headers = {
      ...headers,
      ...noCacheSettings,
    };
  }

  if (
    (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'prod') &&
    req.method === 'GET'
  ) {
    headers = {
      ...headers,
      'Cache-Control': 'public, max-age: 604800',
    };
  }

  res.set({
    ...headers,
    ...option,
  });

  next();
};

module.exports = setApiHeaders;
