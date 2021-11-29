import paths from './paths';
import views from '../views';

const routes = [
  {
    path: '/',
    children: [
      { index: true, element: <views.Logon /> },
      { path: paths.pageNotFound, element: <views.PageNotFound /> },
    ],
  },
  {
    path: paths.courses,
    element: <views.Courses />,
    children: [
      { path: paths.reactCourses, element: <views.ReactCourses /> },
      { path: paths.vueCourses, element: <views.VueCourses /> },
    ],
  },
];

export default routes;
