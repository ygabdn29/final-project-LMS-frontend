import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import FormSubmission from '../../../organism/FormSubmission';

const SubmitAssignment = () => {
  const { courseId, materialId, assignmentId } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const courseTrId = 1;

  const handleFormSubmit = (submitData) => {
    axios.post(
      `http://localhost:8080/api/course/${courseId}/material/${materialId}/assignment/${assignmentId}/submit`,
      submitData,
      { headers: { 'courseTrId': courseTrId } }
    )
    .then(response => {
      setMessage(response.data.message);
      setError('');
      navigate(`/mentor/course/${courseId}/materials`);
    })
    .catch(error => {
      setError("Failed to submit assignment: " + error.response?.data?.message || "An error occurred");
      setMessage('');
    });
  };

  return (
    <div className="container mt-4">
      <h2>Submit Assignment</h2>
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}
      <FormSubmission onSubmit={handleFormSubmit} />
    </div>
  );
};

export default SubmitAssignment;
