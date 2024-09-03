import React, { useState, useEffect } from 'react';
import axios from 'axios';

let CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    mentorId: ''
  });

  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/account/mentors")
      .then(response => {
        setMentors(response.data.data);
      })
      .catch(error => {
        console.error("Error get list mentors: ", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/api/course/create", courseData)
      .then(response => {
        console.log("Course created successfully: ", response.data);
      })
      .catch(error => {
        console.error("Error create course: ", error);
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
    <>
      <div>
        <h1>Create Course</h1>
        <form onSubmit={handleSubmit}>
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
              <option value="" disabled>Choose a mentor</option>
              {mentors.map(mentor => (
                <option key={mentor.id} value={mentor.id}>
                  {mentor.username}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Create Course</button>
        </form>
      </div>
    </>

  );
}

export default CreateCourse;
