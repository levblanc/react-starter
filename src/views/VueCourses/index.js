import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectAllCourses,
  getCourseInfo,
  selectCourseStatus,
  selectCourseType,
} from '../../store/courses';
import { statusType } from '../../store/utils';

function VueCourses() {
  const dispatch = useDispatch();
  const vueCourses = useSelector(selectAllCourses);
  const courseStatus = useSelector(selectCourseStatus);
  const currentCourseType = useSelector(selectCourseType);
  const courseType = 'vue';

  useEffect(() => {
    document.title = 'Vue Courses | UI Courses';

    if (currentCourseType !== courseType) {
      dispatch(getCourseInfo(courseType));
    }
  }, [currentCourseType, dispatch]);

  if (courseStatus === statusType.loading) {
    return <div>Loading...</div>;
  } else if (courseStatus === statusType.success) {
    return (
      <div className='vueCourses'>
        <ul>
          {vueCourses.map((course, index) => (
            <li key={index}>
              <Link to={`:${course.id}`}>{course.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (courseStatus === statusType.fail) {
    return <div>Fetch Vue course data failed</div>;
  } else {
    return <div>Vue Courses Page Error</div>;
  }
}

export default VueCourses;
