import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ManageCourses from "./components/pages/manageCourses";
import AccessCourse from "./components/organism/accessCourseMentee";
import EnrolledCourses from "./components/pages/enrolledCourses";
import AccessCourseMentor from "./components/organism/accessCourseMentor";
import AssignedCourse from "./components/pages/assignedCourse";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EnrolledCourses/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
