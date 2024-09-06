import AccessCourse from "../../organism/accessCourse";
import Dashboard from "../../templates/dashboard";

function Course (){
  return(
    <>
      <Dashboard>
        <h1 className="text-center">Access Course</h1>
        <AccessCourse></AccessCourse>
      </Dashboard>
    </>
  )
}

export default Course;