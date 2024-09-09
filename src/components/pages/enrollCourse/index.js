import { useEffect, useState } from "react";
import Dashboard from "../../templates/dashboard";
import axios from "axios";

function EnrollCourse() {
  const [courses, setCourses] = useState();
  useEffect(() => {
    axios.get("http://localhost:8080/api/course/").then((response) => {
      setCourses(response.data.data);
    });
  }, []);

  return (
    <div>
      <h1 className="display-5 text-center mb-3">Enroll Course</h1>
      <ul className="list-unstyled">
        {courses?.map((course, id) => {
          return (
            <li key={id} className="card card-outline-info">
              <div className="card-header">
                <h2 className="font-weight-bold">{course.title}</h2>
              </div>
              <div className="card-body">
                <h4 className=""> {course.description}</h4>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEnroll(course.id);
                  }}
                >
                  <button type="submit" className="btn btn-success">
                    Enroll
                  </button>
                </form>
              </div>
            </li>
          );
        })}
      </ul>
    </div>

    // <Dashboard>
    // </Dashboard>
  );
}

function handleEnroll(courseId) {
  console.log(courseId);
  axios
    .post("http://localhost:8080/api/course/enroll", {
      // nanti ambil dari session
      userId: 2,
      courseId: courseId,
    })
    .then((response) => alert(response.data.message))
    .catch((error) => alert(error));
}

export default EnrollCourse;
