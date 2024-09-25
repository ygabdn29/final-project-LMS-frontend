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
      <h1 className="display-5 text-center mb-4">List of Assignments</h1>
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
                <tr>
                  <td>{assignment.name}</td>
                  <td className="text-center">
                    <Link to={``} className="btn btn-warning">
                      <span className="mr-1">
                        <i className="mdi mdi-pencil"></i>
                      </span>
                      Edit
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
