import React, { useState, useEffect } from 'react';
import axios from 'axios';

let AccessCourse = () => {
  const [dataCourse, setDataCourse] = useState(null);

  let propdata = 5; //nanti pass dr function parameter/ props

  useEffect(() => {
    axios.get(`http://localhost:8080/api/course/${propdata}`)
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
      <h1>Access Course</h1>
      <h1>Course Title:</h1>
      <h2>{dataCourse.title}</h2>
      <h1>Content:</h1>
      <h2>{dataCourse.description}</h2>
      <h1>Mentor:</h1>
      <h2>{dataCourse.mentor.username}</h2>
    </>
  )
}

export default AccessCourse;
