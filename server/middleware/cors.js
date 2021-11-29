const allowOrigins = ['http://localhost:3000'];

const isPreflight = (req) => {
  return (
    req.methods === 'OPTIONS' &&
    req.headers['origin'] &&
    req.headers['access-control-request-method']
  );
};

const cors = (options) => (req, res, next) => {
  const { origin } = req.headers;

  if (allowOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  }

  res.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Headers', 'authorization, Content-type');

  if (isPreflight(req)) {
    console.log('is preflight')
    res.status(204).end();
    return;
  }

  next();
};

module.exports = cors;
