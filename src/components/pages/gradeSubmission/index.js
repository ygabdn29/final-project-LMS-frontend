import Dashboard from "../../templates/dashboard";
import GradingSubmission from "../../organism/gradingSubmission";

function GradeSubmission() {
  return (
    <>
      <Dashboard>
        <h1 className="text-center">Grade Submission</h1>
        <GradingSubmission></GradingSubmission>
      </Dashboard>
    </>
  )
}

export default GradeSubmission;