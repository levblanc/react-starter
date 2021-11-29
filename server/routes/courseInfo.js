const { http } = require('../constants');

module.exports = {
  method: http.get,
  route: '/get-courses-info',
  handler: courseInfo,
};

function courseInfo(req, res) {
  const { courseType } = req.query;
  let resStatus = 200;
  const resBody = {
    data: null,
    error: null,
  };

  if (!courseType) {
    resStatus = 401;
    resBody.error = 'No course type';
    res.status(resStatus).json(resBody);
    return;
  }

  if (courseType !== 'react' && courseType !== 'vue') {
    resStatus = 401;
    resBody.error = 'Unknown course type';
    res.status(resStatus).json(resBody);
    return;
  }

  const reactCourses = [
    {
      name: 'React Fundamentals',
      id: 1,
    },
    {
      name: 'Advanced React',
      id: 2,
    },
    {
      name: 'React Router',
      id: 3,
    },
  ];

  const vueCourses = [
    {
      name: 'Vue Fundamentals',
      id: 4,
    },
    {
      name: 'Advanced Vue',
      id: 5,
    },
    {
      name: 'Vue Router',
      id: 6,
    },
  ];

  if (courseType === 'react') {
    resBody.data = {
      type: 'react',
      list: reactCourses,
    };
  } else if (courseType === 'vue') {
    resBody.data = {
      type: 'vue',
      list: vueCourses,
    };
  }

  res.status(resStatus).json(resBody);
}
