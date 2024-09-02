import RegisterForm from "../../organism/registerForm";
import TopNavbar from "../../templates/topNavbar";

function Registration() {
  return (
    <TopNavbar>
      <h1 className="text-center">Registration</h1>
      <RegisterForm></RegisterForm>
    </TopNavbar>
  );
}

export default Registration;
