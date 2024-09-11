import { useParams } from "react-router-dom";
import TopNavbar from "../../templates/topNavbar";
import axios from "axios";

function EmailVerification() {
  const { guid } = useParams();
  return (
    <TopNavbar>
      {console.log(guid)}
      <div>
        <h1 className="text-center display-5 my-4">Click verify your email!</h1>
        <form
          onSubmit={(e) => handleVerify(e, guid)}
          className="d-flex justify-content-center"
        >
          <button type="submit" className="btn btn-success btn-lg">
            <span className="">Verify</span>
          </button>
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
