import axios from "axios";
import { error } from "jquery";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditAssignment() {
  const { courseId, materialId, assignmentId } = useParams();
  const [assignment, setAssignment] = useState();
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAssignment((oldAssignment) => ({ ...oldAssignment, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `http://localhost:8080/api/course/${courseId}/material/${materialId}/assignment/new`,
        assignment
      )
      .then((response) => {
        alert("Assignment Updated Successfully!");
        navigate(
          `/dashboard/mentor/course/${courseId}/material/${materialId}/assignments`
        );
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="container">
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

      <div className="d-flex">
        <div
          className="card card-outline-info mr-2"
          style={{ flex: "1 1 50%" }}
        >
          <div className="card-header">
            <h4 className="mb-0 text-white">Course Detail</h4>
          </div>

          <div className="d-flex flex-column card-body">
            <label>
              Course Title:
              <span className="ml-1 font-bold">
                {assignment?.material?.course?.title}
              </span>
            </label>

            <label>
              Mentor:
              <span className="ml-1 font-bold">
                {assignment?.material.course?.mentor.username}
              </span>
            </label>
          </div>
        </div>

        <div
          className="card card-outline-info ml-2 "
          style={{ flex: "1 1 50%" }}
        >
          <div className="card-header">
            <h4 className="mb-0 text-white">Material Detail</h4>
          </div>

          <div className="card-body">
            <div className="mb-3">
              <label>
                Material Title:
                <span className="ml-1 font-bold">
                  {assignment?.material.title}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-outline-info">
        <div className="card-header">
          <h4 className="mb-0 text-white">Assignment</h4>
        </div>
        <form className="form-group shadow p-4 rounded" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              <strong>Assignment Title</strong>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={assignment?.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              <strong>Content</strong>
            </label>
            <textarea
              type="text"
              id="content"
              name="content"
              className="form-control"
              value={assignment?.content}
              onChange={handleChange}
              placeholder={assignment?.content}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              <strong>Passing Score</strong>
            </label>
            <input
              type="number"
              id="passingScore"
              name="passingScore"
              className="form-control"
              value={assignment?.passingScore}
              onChange={handleChange}
              placeholder={assignment?.passingScore}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              <strong>Due Date</strong>
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="form-control"
              value={assignment?.dueDate}
              onChange={handleChange}
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
    </div>
  );
}

export default EditAssignment;
