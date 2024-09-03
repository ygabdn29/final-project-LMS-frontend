import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddMaterial from './components/pages/Mentor/NewMaterial';
import CourseListMentee from './components/pages/Mentee/ListCourseMentee'; // For mentees
import CourseListMentor from './components/pages/Mentor/ListCourseMentor'; // For mentors
import ListMaterialMentee from './components/pages/Mentee/ListMaterialMentee'; // For mentees
import ListMaterialMentor from './components/pages/Mentor/ListMaterialMentor'; // For mentors
import MaterialDetail from './components/pages/Mentee/AccessMaterial';
import './App.css';
import { useState } from "react";
import EmailVerification from "./components/pages/emailVerification";
import Login from "./components/pages/login";
import Registration from "./components/pages/registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const courses = [
    { id: 1, name: 'Front End Developer' },
    { id: 2, name: 'Back End Developer' },
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            path="/register"
            element={<Registration></Registration>}
          ></Route>
          <Route
            path="/verify/:guid"
            element={<EmailVerification></EmailVerification>}
          ></Route>
        </Routes>
        <Routes>
        {/* Route Mentee */}
        <Route path="/" element={<CourseListMentee courses={courses} />} />
        <Route path="/course/:courseId/materials" element={<ListMaterialMentee />} />
        <Route path="/course/:courseId/material/:materialId" element={<MaterialDetail />} />
        
        {/* Route Mentor*/}
        <Route path="/mentor/courses" element={<CourseListMentor courses={courses} />} />
        <Route path="/mentor/course/:courseId/materials" element={<ListMaterialMentor />} />
        <Route path="/course/:courseId/new-material" element={<AddMaterial />} />
      </Routes>
      </BrowserRouter>
      {/* <Registration></Registration> */}
      {/* <Login></Login> */}
      {/* <EmailVerification></EmailVerification> */}
    </div>
  );
}

export default App;
