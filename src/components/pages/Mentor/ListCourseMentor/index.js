import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CourseListMentor = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const fetchCourse = () => {
    axios
      .get("http://localhost:8080/api/course")
      .then((response) => {
        setCourses(response.data.data);
        setError("");
      })
      .catch((error) => {
        setError("Error Fetching Courses");
        setCourses([]);
        console.error("Error fetching courses:", error);
      });
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div>
      <h2>Select a Course</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <Link to={`course/${course.id}/materials`}>{course.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
};

export default CourseListMentor;
