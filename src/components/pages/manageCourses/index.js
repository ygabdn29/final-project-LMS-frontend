import Dashboard from "../../templates/dashboard";
import ListCoursesAdmin from "../../organism/listCoursesAdmin";

function ManageCourses() {
  return(
    <>
      <Dashboard>
        <ListCoursesAdmin></ListCoursesAdmin>
      </Dashboard>
    </>
  )
}

export default ManageCourses;