const { http } = require('../constants');

module.exports = {
  method: http.post,
  route: '/verify-user-info',
  handler: verifyUserInfo,
};

function verifyUserInfo(req, res) {
  const { username, password } = req.body;
  let resStatus = 200;
  const resBody = {
    data: null,
    error: null,
  };

  if (!username || !password) {
    resStatus = 401;
    resBody.error = 'unauthorized';
    res.status(resStatus).json(resBody);
    return;
  }

  if (username === 'admin') {
    resBody.data = 'success';
  } else {
    resStatus = 401;
    resBody.error = 'Username not recognized.';
  }

  if (password === '111111') {
    resBody.data = 'success';
  } else {
    resStatus = 401;
    resBody.error = 'Password not recognized.';
  }

  res.status(resStatus).json(resBody);
}
