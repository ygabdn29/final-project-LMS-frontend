import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormMaterial from "../../../organism/FormMaterial";
import axios from "axios";

const AddMaterial = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFormMaterial = (material) => {
    axios.post(`http://localhost:8080/api/course/${courseId}/new-material`, material)
      .then((response) => {
        setMessage(response.data.message);
        setError('');
        navigate(`/mentor/course/${courseId}/materials`);
      })
      .catch((error) => {
        setError("Failed to add material");
        setMessage('');
        console.error("Failed to add material", error);
      });
  }

  return (
    <div>
      <h2>Add New Material to Course {courseId}</h2>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <FormMaterial onSubmit={handleFormMaterial} />
    </div>
  );
};

export default AddMaterial;
