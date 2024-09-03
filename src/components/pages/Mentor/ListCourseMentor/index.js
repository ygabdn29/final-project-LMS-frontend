import React from 'react';
import { Link } from 'react-router-dom';

const CourseList = ({ courses}) => {
  return (
    <div>
      <h2>Select a Course</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <Link to={`/mentor/course/${course.id}/materials`}>
              {course.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
