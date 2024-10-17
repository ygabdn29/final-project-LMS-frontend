import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

let AccessCourseMentee = () => {
  const [dataCourse, setDataCourse] = useState([]);
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const userId = userDetails?.userID;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/course/enrolled", {
        headers: { id: userId },
      })
      .then((response) => {
        setDataCourse(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //handling to wait get data
  if (dataCourse === null) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h1 className="mb-3">Enrolled Courses: </h1>
      <div className="col-md-12 px-20">
        <ul className="list-unstyled">
          {dataCourse?.map((courses) => (
            <li key={courses.course.id} className="card card-outline-info">
              <div className="card-header">
                <h2 className="mb-1">Course Title:</h2>
                <h2>{courses.course.title}</h2>
              </div>
              <div className="card-body">
                <h3>Description:</h3>
                <p>{courses.course.description}</p>
                <h3>Mentor:</h3>
                <p>{courses.course.mentor.username}</p>
                <Link
                  to={`/dashboard/mentee/course/${courses.course.id}/materials`}
                  className="btn btn-inverse"
                >
                  View Materials
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AccessCourseMentee;
