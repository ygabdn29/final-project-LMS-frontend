import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import FormMaterialQuill from '../../../organism/FormMaterialQuill'; // Pastikan path-nya sesuai dengan file Anda
import axios from 'axios';

const AddMaterial = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [course, setCourse] = useState('');
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
  };

  const fetchCourse = () => {
    axios.get(`http://localhost:8080/api/course/${courseId}`)
      .then(response => {
        setCourse(response.data.data.title);
        setError('');
      })
      .catch(error => {
        setError("Failed to access course");
        setCourse('');
      });
  };

  useEffect(() => {
    fetchCourse();
  });

  return (
    <div>
      <h2>Add New Material to Course: {course}</h2>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <FormMaterialQuill onSubmit={handleFormMaterial} />
    </div>
  );
};

export default AddMaterial;
