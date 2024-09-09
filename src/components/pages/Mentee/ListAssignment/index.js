import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ListAssignment() {
  const { courseId, materialId } = useParams();
  const [assignments, setAssignment] = useState();

  useEffect(() => {
    function fetchAssignment() {
      axios
        .get(
          `http://localhost:8080/api/course/${courseId}/material/${materialId}/assignment`
        )
        .then((response) => setAssignment(response.data.data))
        .catch((error) => alert(error));
    }
    fetchAssignment();
  }, []);

  return (
    <>
      <h1 className="display-5 text-center">List Assignments</h1>
      <div>
        {assignments?.map((assignment, id) => (
          <div className="card card-outline-info">
            <div className="card-header">
              <h2>{assignment.name}</h2>
            </div>
            <div className="card-body">
              <a
                href="https://www.google.com/docs/about/"
                target="_blank"
                className="btn btn-primary"
              >
                Assignment Content Link
              </a>
              <h4 className="mt-4">Due Date: {`${assignment.dueDate}`}</h4>
              <h4 className="">
                Passing Score: {`${assignment.passingScore}`}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListAssignment;
