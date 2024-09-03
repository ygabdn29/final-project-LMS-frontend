import React, { useState, useEffect } from 'react';
import axios from 'axios';

let UpdateCourse = () => {
  const [courseData, setCourseData] = useState({
    id: '',
    title: '',
    description: '',
    mentorId: ''
  });

  const [courses, setCourses] = useState([]);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/course")
      .then(response => {
        setCourses(response.data.data);
      })
      .catch(error => {
        console.error("Error getingt list courses: ", error);
      });
  }, []);


  useEffect(() => {
    axios.get("http://localhost:8080/api/account/mentors")
      .then(response => {
        setMentors(response.data.data);
      })
      .catch(error => {
        console.error("Error getting list mentors: ", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/api/course/update", courseData)
      .then(response => {
        console.log("Course updated successfully: ", response.data);
      })
      .catch(error => {
        console.error("Error update course: ", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value
    });
  };

  return (
    <div>
      <h1>Update Course</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course ID:</label>
          <select
            name="id"
            value={courseData.id}
            onChange={handleChange}
            required
          >
            <option value="">Select a course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mentor ID:</label>
          <select
            name="mentorId"
            value={courseData.mentorId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select mentor</option>
            {mentors.map(mentor => (
              <option key={mentor.id} value={mentor.id}>
                {mentor.username}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
}

export default UpdateCourse;
