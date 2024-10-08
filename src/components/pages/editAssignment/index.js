import axios from "axios";
import { error } from "jquery";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function EditAssignment() {
  const { courseId, materialId, assignmentId } = useParams();
  const [assignment, setAssignment] = useState();

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/course/${courseId}/material/${materialId}/assignment/${assignmentId}`
      )
      .then((response) => setAssignment(response.data.data))
      .catch((error) => alert(error));
  }, []);

  const handleBack = () => {
    console.log(test);
  };

  return (
    <div className="container mt-4">
      <div className="page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/dashboard/mentor">Dashboard</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/dashboard/mentor">Course</a>
          </li>
          <li className="breadcrumb-item">
            <Link
              to={`/dashboard/mentor/course/${assignment?.material?.course.id}/material/${assignment?.material?.id}/assignments`}
            >
              {assignment?.material?.title}
            </Link>
          </li>

          <li className="breadcrumb-item active">{assignment?.name} Edit</li>
        </ol>
      </div>

      <form
        className="form-group shadow p-4 rounded"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <h4 className="text-center">Course Detail</h4>
        <div className="mb-3">
          <label htmlFor="firstName" className="mb-2 align-self-start">
            <strong>Course Title:</strong>
          </label>
          <input
            type="text"
            className="form-control"
            value={assignment?.material?.course?.title}
            disabled
            readOnly={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstName" className="mb-2 align-self-start">
            <strong>Course Description:</strong>
          </label>
          <textarea
            className="form-control"
            value={assignment?.material?.course?.description}
            disabled
            readOnly={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstName" className="mb-2 align-self-start">
            <strong>Mentor:</strong>
          </label>
          <input
            type="text"
            className="form-control"
            value={assignment?.material.course?.mentor.username}
            disabled
            readOnly={true}
          />
        </div>
      </form>

      <form
        className="form-group shadow p-4 rounded"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <h4 className="text-center">Material Detail</h4>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <strong>Material Title</strong>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={assignment?.material.title}
            placeholder={assignment?.material.title}
            disabled
          />
        </div>
      </form>

      <form
        className="form-group shadow p-4 rounded"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <h4 className="text-center">Edit Assignment</h4>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <strong>Assignment Title</strong>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={assignment?.name}
            placeholder={assignment?.name}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <strong>Content</strong>
          </label>
          <textarea
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={assignment?.content}
            placeholder={assignment?.content}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <strong>Passing Score</strong>
          </label>
          <input
            type="number"
            id="title"
            name="title"
            className="form-control"
            value={assignment?.passingScore}
            placeholder={assignment?.passingScore}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <strong>Material Title</strong>
          </label>
          <input
            type="date"
            id="title"
            name="title"
            className="form-control"
            value={assignment?.dueDate}
            placeholder={assignment?.dueDate}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success px-4 mt-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAssignment;
