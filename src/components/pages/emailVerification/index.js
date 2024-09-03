import { useParams } from "react-router-dom";
import TopNavbar from "../../templates/topNavbar";
import axios from "axios";

function EmailVerification() {
  const { guid } = useParams();
  return (
    <TopNavbar>
      {console.log(guid)}
      <div>
        <h1 className="text-center">Click verify your email!</h1>
        <form onSubmit={(e) => handleVerify(e, guid)}>
          <button type="submit">verify</button>
        </form>
      </div>
    </TopNavbar>
  );
}

function handleVerify(e, guid) {
  e.preventDefault();
  axios
    .get(`http://localhost:8080/api/account/verify/${guid}`)
    .then((response) => {
      alert(response.data.message);
      window.location.replace("http://localhost:3000/login");
    })
    .catch((error) => alert(error));
}

export default EmailVerification;
