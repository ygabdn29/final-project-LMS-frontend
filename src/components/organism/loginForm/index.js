import axios from "axios";
import { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="card bg-light p-5 w-50 mx-auto">
      <form onSubmit={(e) => handleSubmit(e, username, password)}>
        <div className="d-flex flex-column">
          <label htmlFor="firstName" className="mb-2 align-self-start">
            Username:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="password">Password:</label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-success waves-effect waves-light align-self-start mt-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function handleSubmit(e, username, password) {
  e.preventDefault();
  axios
    .post("http://localhost:8080/api/account/login", {
      username: username,
      password: password,
      requestedRole: "Admin",
    })
    .then((response) => {
      const userData = response.data.data;
      console.log(userData);
      sessionStorage.setItem("userData", JSON.stringify(userData));
      alert(response.data.message);
      let userDetails = JSON.parse(sessionStorage.getItem("userData"));
      console.log("User Details: ", userDetails);
      // if (!userDetails) {
      //   alert("User data not found, please try logging in again.");
      //   return;
      // }
      // if (!userDetails) {
      //   alert("User data not found, please try logging in again.");
      //   return;
      // }
      if (userDetails.primaryRole === "Mentee")
        window.location.href = "http://localhost:3000/dashboard/mentee";
      // window.location.replace("http://localhost:3000/dashboard/mentee");
      else if (userDetails.primaryRole === "Mentor")
        window.location.replace("http://localhost:3000/dashboard/mentor");
      else if (userDetails.primaryRole === "Admin")
        window.location.replace("http://localhost:3000/dashboard/admin");
      else {
        console.error("Unknown role:", userDetails.primaryRole);
      }
    })
    .catch((error) => alert(error));
}
export default LoginForm;
