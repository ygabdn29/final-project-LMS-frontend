import Dashboard from "../../templates/dashboard";
import AccessMenteeSubmission from "../../organism/accessMenteeSubmission";

function Submission() {
  return (
    <>
      <Dashboard>
        <h1 className="text-center">Submission</h1>
        <AccessMenteeSubmission></AccessMenteeSubmission>
      </Dashboard>
    </>
  )
}

export default Submission;