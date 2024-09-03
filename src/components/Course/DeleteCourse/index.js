import React, { useState, useEffect } from 'react';
import axios from 'axios';

let DeleteCourse = () => {
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/course")
      .then(response => {
        setCourses(response.data.data);
      })
      .catch(error => {
        console.error("Error getting list courses: ", error);
      });
  }, []);

  const handleChange = (e) => {
    setCourseId(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.delete(`http://localhost:8080/api/course/delete`,
      {
        headers: {
          'id': courseId
        }
      }
    )
      .then(response => {
        console.log("Course deleted successfully", response.data);
        setCourseId('');
      })
      .catch(error => {
        console.error("Error deleting course: ", error);
      })
  }

  return (
    <>
      <h1>Delete Course</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course ID:</label>
          <select
            name="id"
            value={courseId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Delete Course</button>
      </form>
    </>
  )
}

export default DeleteCourse;