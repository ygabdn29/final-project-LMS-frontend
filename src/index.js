import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AccessAssignment from './components/Assignment/AccessAssignment';
import AccessCourse from './components/Course/AccessCourse';
import CreateCourse from './components/Course/CreateCourse';
import UpdateCourse from './components/Course/UpdateCourse';
import GetScore from './components/Assignment/Score';
import GradeAssignment from './components/Assignment/Grading';
import DeleteCourse from './components/Course/DeleteCourse';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}

    {/* <AccessAssignment />
    <br/>
    <GradeAssignment /> */}

    {/* <AccessAssignment />
    <br/>
    <GetScore/> */}

    {/* <AccessCourse/> */}

    <CreateCourse/>

    {/* <UpdateCourse/> */}

    {/* <DeleteCourse/> */}
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
