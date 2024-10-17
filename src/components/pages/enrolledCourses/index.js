import Dashboard from "../../templates/dashboard";
import AccessCourseMentee from "../../organism/accessCourseMentee";

function EnrolledCourses() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  console.log(userData);
  return (
    <>
      <AccessCourseMentee></AccessCourseMentee>
    </>
  );
}

export default EnrolledCourses;
