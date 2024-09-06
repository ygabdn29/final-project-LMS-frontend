import AddMaterial from "./components/pages/Mentor/NewMaterial";
import CourseListMentee from "./components/pages/Mentee/ListCourseMentee";
import CourseListMentor from "./components/pages/Mentor/ListCourseMentor";
import ListMaterialMentee from "./components/pages/Mentee/ListMaterialMentee";
import ListMaterialMentor from "./components/pages/Mentor/ListMaterialMentor";
import MaterialDetail from "./components/pages/Mentee/AccessMaterial";
import EditMaterial from "./components/pages/Mentor/UpdateMaterial";
import Material from "./components/pages/Mentor/AccessMaterialMentor";
import EmailVerification from "./components/pages/emailVerification";
import Login from "./components/pages/login";
import Dashboard from "./components/templates/dashboard";
import Registration from "./components/pages/registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SubmitAssignment from "./components/pages/Mentee/SubmitAssignment";
import EnrollCourse from "./components/pages/enrollCourse";
import EnrolledCourses from "./components/pages/enrolledCourses";
import AssignedCourse from "./components/pages/assignedCourse";
import ManageCourses from "./components/pages/manageCourses";
import GradeSubmission from "./components/pages/gradeSubmission";
import MenteeDashboard from "./components/pages/Mentee/MenteeDashboard";
import MentorDashboard from "./components/pages/Mentor/MentorDashboard";
import AdminDashboard from "./components/pages/adminDashboard/inedx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<h1>Index</h1>}></Route>
          {/* Login Route */}
          <Route path="/login" element={<Login />}></Route>

          {/* Register Route */}
          <Route path="/register" element={<Registration />}></Route>

          {/* Verify Account Route */}
          <Route path="/verify/:guid" element={<EmailVerification />}></Route>

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="mentee" element={<MenteeDashboard />}>
              <Route index element={<EnrolledCourses />} />
              <Route path="course">
                <Route path="list" element={<EnrollCourse />}></Route>
                <Route
                  path=":courseId/materials"
                  element={<ListMaterialMentee />}
                />
                <Route
                  path=":courseId/material/:materialId"
                  element={<MaterialDetail />}
                />
                <Route
                  path=":courseId/material/:materialId/assignment/:assignmentId/submit"
                  element={<SubmitAssignment />}
                />
              </Route>
            </Route>

            <Route path="mentor" element={<MentorDashboard />}>
              {/* <Route  element={<CourseListMentor />} /> */}
              <Route index element={<AssignedCourse />} />
              <Route
                path="course/:courseId/materials"
                element={<ListMaterialMentor />}
              />
              <Route path="course/:courseId/new-material" element={<AddMaterial></AddMaterial>}></Route>
              <Route path="course/:courseId/edit-material/:materialId" element={<EditMaterial />} />
              <Route path="grade" element={<GradeSubmission />} />
            </Route>

            <Route path="admin" element={<AdminDashboard></AdminDashboard>}>
              <Route path="manage/courses" element={<ManageCourses />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
