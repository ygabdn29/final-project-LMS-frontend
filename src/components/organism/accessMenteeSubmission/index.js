import React, { useState, useEffect } from 'react';
import axios from 'axios';

let AccessMenteeSubmission = () => {
  const [dataAssignment, setDataAssignment] = useState(null);

  let sessionId = 3; // The submission ID

  useEffect(() => {
    axios.get(`http://localhost:8080/api/course/1/material/1/assignment/1283123/${sessionId}`)
      .then(response => {
        setDataAssignment(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  //handling to wait get data
  if (dataAssignment === null) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h1>Access Assignment</h1>
      <h1>Nama Mentee: </h1>
      <h2>{dataAssignment.courseTransaction.user.username}</h2>
      <h1>Judul Assignment: </h1>
      <h2>{dataAssignment.assignment.name}</h2>
      <h1>Soal: </h1>
      <h2>{dataAssignment.assignment.content}</h2>
      <h1>Jawaban: </h1>
      <h2>{dataAssignment.answer}</h2>
      <h1>Score:</h1>
      <h2>
        {dataAssignment.score ? (
          dataAssignment.score
        ) : (
          "Assignment hasn't been graded yet"
        )}
      </h2>
    </>
  )
}

export default AccessMenteeSubmission;
