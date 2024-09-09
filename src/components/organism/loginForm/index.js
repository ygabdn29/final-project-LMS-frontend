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
    })
    .then((response) => {
      const userDetails = response.data.data;
      sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
      console.log(sessionStorage.getItem("userDetails"));
      alert(response.data.message);
    })
    .catch((error) => alert(error));
}
export default LoginForm;
