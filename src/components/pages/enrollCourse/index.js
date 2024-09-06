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
      <h1>EnrollCourse</h1>
      {courses?.map((course, id) => {
        return (
          <div key={id}>
            <span>{course.title}</span>
            <span> {course.description}</span>
            <span id="courseId"> {course.id}</span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEnroll(course.id);
              }}
            >
              <button>Enroll</button>
            </form>
          </div>
        );
      })}
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
