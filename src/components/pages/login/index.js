import LoginForm from "../../organism/loginForm";
import TopNavbar from "../../templates/topNavbar";

function Login() {
  return (
    <TopNavbar>
      <h1 className="text-center">Login</h1>
      <LoginForm></LoginForm>
    </TopNavbar>
  );
}

export default Login;
