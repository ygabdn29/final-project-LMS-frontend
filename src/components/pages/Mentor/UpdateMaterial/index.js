import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditMaterial = () => {
  const { courseId, materialId } = useParams();
  const [material, setMaterial] = useState({
    title: '',
    content: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/course/${courseId}/material/${materialId}`)
      .then(response => {
        setMaterial({
          title: response.data.title,
          content: response.data.content
        });
        setError('');
      })
      .catch(error => {
        setError("Error fetching material data");
        console.error("Error fetching material:", error);
      });
  }, [courseId, materialId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaterial({ ...material, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/course/${courseId}/edit-material/${materialId}`, material)
      .then(response => {
        console.log("Update Material Successfully", response.data);
        navigate(`/mentor/course/${courseId}/materials`);
      })
      .catch(error => {
        setError("Failed to update material");
        console.error("Error updating material:", error);
      });
  }

  return (
    <div>
      <h2>Edit Material</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={material.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={material.content}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update Material</button>
      </form>
    </div>
  );
}

export default EditMaterial;
