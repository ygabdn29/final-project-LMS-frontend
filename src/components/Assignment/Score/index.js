import React, { useState, useEffect } from 'react';
import axios from 'axios';

let GetScore = () => {
  const [dataScore, setDataScore] = useState(0);
  let submissionId = 1; //props.data

  useEffect(() => {
    axios.get(`http://localhost:8080/api/course/1/material/1/assignment/1283123/${submissionId}/score`)
      .then(response => {
        setDataScore(response.data.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return(
    <>
      <h1>Your Score: </h1>
      <h2>{dataScore}</h2>
    </>
  )
}

export default GetScore;