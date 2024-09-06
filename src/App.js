import AddMaterial from './components/pages/Mentor/NewMaterial';
import CourseListMentee from './components/pages/Mentee/ListCourseMentee';
import CourseListMentor from './components/pages/Mentor/ListCourseMentor';
import ListMaterialMentee from './components/pages/Mentee/ListMaterialMentee';
import ListMaterialMentor from './components/pages/Mentor/ListMaterialMentor';
import MaterialDetail from './components/pages/Mentee/AccessMaterial';
import EditMaterial from './components/pages/Mentor/UpdateMaterial';
import Material from './components/pages/Mentor/AccessMaterialMentor';
import EmailVerification from "./components/pages/emailVerification";
import Login from "./components/pages/login";
import Dashboard from './components/templates/dashboard';
import Registration from "./components/pages/registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import SubmitAssignment from './components/pages/Mentee/SubmitAssignment';
import Dashboard from "./components/templates/dashboard";
import EnrollCourse from "./components/pages/enrollCourse";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route
            path="/courses"
            element={<EnrollCourse></EnrollCourse>}
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            path="/register"
            element={<Registration></Registration>}
          ></Route>
          <Route
            path="/verify/:guid"
            element={<EmailVerification></EmailVerification>}
          ></Route>
          <Route path="/course/:courseId/material/:materialId/assignment/:assignmentId/submit" element={<SubmitAssignment />} />

          {/* Route Mentee */}
          <Route path="/course" element={<Layout />}>
            <Route index element={<CourseListMentee />} />
            <Route path="/course/:courseId/materials" element={<ListMaterialMentee />} />
            <Route path="/course/:courseId/material/:materialId" element={<MaterialDetail />} />
          </Route>

          {/* Route Mentor*/}
          <Route path="/mentor" element={<Layout />}>
            <Route index element={<CourseListMentor />} />
            <Route path="/mentor/course/:courseId/materials" element={<ListMaterialMentor />} />
          </Route>
        </Routes>
        <Routes>
          {/* Route Mentee */}
          <Route path="/" element={<CourseListMentee courses={courses} />} />
          <Route
            path="/course/:courseId/materials"
            element={<ListMaterialMentee />}
          />
          <Route
            path="/course/:courseId/material/:materialId"
            element={<MaterialDetail />}
          />

          {/* Route Mentor*/}
          <Route
            path="/mentor/courses"
            element={<CourseListMentor courses={courses} />}
          />
          <Route
            path="/mentor/course/:courseId/materials"
            element={<ListMaterialMentor />}
          />
          <Route
            path="/course/:courseId/new-material"
            element={<AddMaterial />}
          />
        </Routes>
      </BrowserRouter>
      {/* <Registration></Registration> */}
      {/* <Login></Login> */}
      {/* <EmailVerification></EmailVerification> */}
    </div>
  );
}

export default App;
