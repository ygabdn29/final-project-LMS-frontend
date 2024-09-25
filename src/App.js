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
import NewAssignment from "./components/pages/Mentor/NewAssignment";
import ListAssignment from "./components/pages/Mentee/ListAssignment";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import ListMaterialAssignment from "./components/pages/listMaterialAssignment";

function App() {
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Login Route */}
          <Route index element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>

          {/* Register Route */}
          <Route path="/register" element={<Registration />}></Route>

          {/* Verify Account Route */}
          <Route path="/verify/:guid" element={<EmailVerification />}></Route>

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="mentee" element={<MenteeDashboard />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <EnrolledCourses />
                  </ProtectedRoute>
                }
              />
              <Route path="course">
                <Route
                  path="list"
                  element={
                    <ProtectedRoute>
                      <EnrollCourse />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path=":courseId/materials"
                  element={
                    <ProtectedRoute>
                      <ListMaterialMentee />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":courseId/material/:materialId"
                  element={
                    <ProtectedRoute>
                      <MaterialDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":courseId/material/:materialId/assignments"
                  element={
                    <ProtectedRoute>
                      <ListAssignment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":courseId/material/:materialId/assignment/:assignmentId/submit"
                  element={
                    <ProtectedRoute>
                      <SubmitAssignment />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Route>

            <Route path="mentor" element={<MentorDashboard />}>
              {/* <Route  element={<CourseListMentor />} /> */}
              <Route
                index
                element={
                  <ProtectedRoute>
                    <AssignedCourse />
                  </ProtectedRoute>
                }
              />
              <Route path="course">
                <Route
                  path=":courseId/materials"
                  element={
                    <ProtectedRoute>
                      <ListMaterialMentor />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":courseId/material/:materialId/assignments"
                  element={
                    <ProtectedRoute>
                      <ListMaterialAssignment></ListMaterialAssignment>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":courseId/new-material"
                  element={
                    <ProtectedRoute>
                      <AddMaterial />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path=":courseId/edit-material/:materialId"
                  element={
                    <ProtectedRoute>
                      <EditMaterial />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":courseId/material/:materialId/new-assignment"
                  element={
                    <ProtectedRoute>
                      <NewAssignment />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path="grade"
                element={
                  <ProtectedRoute>
                    <GradeSubmission />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="admin" element={<AdminDashboard></AdminDashboard>}>
              <Route
                path="manage/courses"
                element={
                  <ProtectedRoute>
                    <ManageCourses />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
