import React, { useEffect, useState } from 'react';
import axios from 'axios';

let GradeAssignment = () => {

  const [score, setScore] = useState(0);
  let submissionId = 1; //props.data

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(
      `http://localhost:8080/api/course/1/material/1/assignment/1/${submissionId}/grading`,
      {}, //axios post require body on the second parameter
      {
        headers: {
          'score': score
        }
      }
    )
      .then(response => {
        console.log("Submission graded successfully:", response.data);
      })
      .catch(error => {
        console.error("Error grading submission:", error);
      });
  }

  const handleChange = (e) => {
    setScore(e.target.value);
  }

  return (
    <>
      <h1>Grade Assignment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Score:</label>
          <input
            type='number'
            name='score'
            value={score}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit'>Grade Assignment</button>
      </form>
    </>
  );
}

export default GradeAssignment;
