import Dashboard from "../../templates/dashboard";
import AccessCourseMentee from "../../organism/accessCourseMentee";

function EnrolledCourses(){
  return(
    <>
      <Dashboard>
        <AccessCourseMentee></AccessCourseMentee>
      </Dashboard>
    </>
  )
}

export default EnrolledCourses;