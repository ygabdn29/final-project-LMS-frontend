import { useState } from "react";
import EmailVerification from "./components/pages/emailVerification";
import Login from "./components/pages/login";
import Registration from "./components/pages/registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
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
      </BrowserRouter>
      {/* <Registration></Registration> */}
      {/* <Login></Login> */}
      {/* <EmailVerification></EmailVerification> */}
    </div>
  );
}

export default App;
