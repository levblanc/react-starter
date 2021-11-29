import { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import paths from '../../routes/paths';

function Courses() {
  useEffect(() => {
    document.title = 'Courses | UI Courses';
  });
  return (
    <div className='courses'>
      <h2>Welcome to UI Courses</h2>
      <div>
        <Link to={paths.courses}>Home</Link>
      </div>
      <div>
        <Link to={paths.reactCourses}>React Courses</Link>
      </div>
      <div>
        <Link to={paths.vueCourses}>Vue Courses</Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Courses;
