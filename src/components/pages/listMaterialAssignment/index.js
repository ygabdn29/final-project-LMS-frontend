import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ListMaterialAssignment() {
  const [assignments, setAssignments] = useState();
  const { courseId, materialId } = useParams();
  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/course/${courseId}/material/${materialId}/assignment`
      )
      .then((response) => setAssignments(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className="page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/dashboard/mentor">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/dashboard/mentor">
              {assignments?.[0].material?.course?.title}
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/dashboard/mentor/course/${courseId}/materials`}>
              {assignments?.[0].material?.title}
            </Link>
          </li>
          <li className="breadcrumb-item active">Assignments</li>
        </ol>
      </div>
      <button className="btn btn-success mb-3">
        <i className="mdi mdi-plus"></i>
        New Assignment
      </button>
      <div className="table-responsive">
        <table className="table table-bordered color-bordered-table info-bordered-table text-dark">
          <thead>
            <tr>
              <th style={{ width: "80%" }}>Title</th>
              <th className="text-center" style={{ width: "20%" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {assignments?.map((assignment, id) => {
              return (
                <tr key={id}>
                  <td>{assignment.name}</td>
                  <td className="text-center">
                    <Link to={``} className="btn btn-warning">
                      <span className="mr-1">
                        <i className="mdi mdi-pencil"></i>
                      </span>
                      Sunting
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListMaterialAssignment;
