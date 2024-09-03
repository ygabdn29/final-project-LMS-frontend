import axios from "axios";
import { useEffect, useState } from "react";

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState([]);
  const [selectedDept, setSelectedDept] = useState(0);
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/account/get-departments")
      .then((response) => setDepartment(response.data.data))
      .catch((e) => alert(e));
  }, []);

  return (
    <div className="card bg-light p-5 w-50 mx-auto">
      <form
        onSubmit={(e) =>
          handleSubmit(
            e,
            firstName,
            middleName,
            lastName,
            email,
            birthDate,
            address,
            phone,
            selectedDept,
            password
          )
        }
      >
        <div className="d-flex flex-column">
          <label htmlFor="firstName" className="mb-2 align-self-start">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
          />
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="middleName" className="mb-2 align-self-start">
            Middle Name:
          </label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            className="form-control"
            value={middleName}
            onChange={(e) => {
              setMiddleName(e.target.value);
            }}
            required
          />
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="lastName" className="mb-2 align-self-start">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
          />
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            className="form-control"
            type="date"
            id="birthDate"
            name="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="address">Address:</label>
          <input
            className="form-control"
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="phone">Phone:</label>
          <input
            className="form-control"
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="username">Email</label>
          <input
            className="form-control"
            type="text"
            id="username"
            name="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="department">Department: </label>
          <select
            className="custom-select"
            name="department"
            id="department"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value={0}>Select Department:</option>
            {department
              ? department.map((dept, id) => (
                  <option value={dept.id} key={id}>
                    {dept.name}
                  </option>
                ))
              : ""}
          </select>
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

function handleSubmit(
  e,
  firstName,
  middleName,
  lastName,
  email,
  birthDate,
  address,
  phone,
  selectedDept,
  password
) {
  e.preventDefault();
  axios
    .post("http://localhost:8080/api/account/register", {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      birthDate: birthDate,
      address: address,
      phone: phone,
      department_id: selectedDept,
      password: password,
    })
    .then((response) => alert(response.data.message))
    .catch((error) => alert(error));
}
export default RegisterForm;
