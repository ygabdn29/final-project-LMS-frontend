import React, { useState, useEffect } from 'react';
import axios from 'axios';

let AccessCourseMentee = () => {
  const [dataCourse, setDataCourse] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem('userDetails')); 
  const userId = userDetails?.userID; 

  useEffect(() => {
    axios.get("http://localhost:8080/api/course/enrolled",
      { headers: { 'id': userId } }
    )
      .then(response => {
        setDataCourse(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  //handling to wait get data
  if (dataCourse === null) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="col-md-11 p-20">
        <h1 className="card-title">Enrolled Courses:</h1>
        <ul className="list-unstyled">
          {dataCourse.map(courses => (
            <li key={courses.course.id} className="media">
              <div className="media-body">
                <h1 className="mt-0 mb-1">Course Title:</h1>
                <h2>{courses.course.title}</h2>
                <h1>Description:</h1>
                <h2>{courses.course.description}</h2>
                <h1>Mentor:</h1>
                <h2>{courses.course.mentor.username}</h2>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default AccessCourseMentee;
