import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

let AccessCourseMentor = () => {
  const [dataCourse, setDataCourse] = useState(null);
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const userId = userDetails?.userID;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/course/assigned", {
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

  if (dataCourse === null) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h1 className="display-5 text-center mb-4">List of Assigned Course</h1>
      <div className="table-responsive">
        <table className="table table-bordered color-bordered-table info-bordered-table text-dark">
          <thead>
            <tr>
              <th style={{ width: "80%" }}>Course</th>
              <th style={{ width: "20%" }} className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{dataCourse.title}</td>
              <td className="text-center">
                <Link
                  to={`course/${dataCourse.id}/materials`}
                  className="btn btn-info"
                >
                  <span className="mr-1">
                    <i className="mdi mdi-settings"></i>
                  </span>
                  Manage
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <div className="card card-outline-info">
        <div className="card-header">
          <h3>Course Title:</h3>
          <h1>{dataCourse.title}</h1>
        </div>
        <div className="card-body">
          <h3>Description:</h3>
          <h4 className="mb-3">{dataCourse.description}</h4>

          <Link to="" className="btn btn-info">
            View Details
          </Link>
        </div>
      </div> */}
    </>
  );
};

export default AccessCourseMentor;
