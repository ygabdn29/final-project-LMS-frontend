import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    const { title, value } = e.target;
    setMaterial({ ...material, [title]: value });
  }

  const handleContentChange = (value) => {
    setMaterial({ ...material, content: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/course/${courseId}/edit-material/${materialId}`, material)
      .then(response => {
        console.log("Updated Material Successfully", response.data);
        navigate(`/mentor/course/${courseId}/materials`);
      })
      .catch(error => {
        setError("Failed to update material");
        console.error("Error updating material:", error);
      });
  }

  return (
    <div className="container mt-4">
      <h2>Edit Material</h2>
      <form onSubmit={handleSubmit} className="form-group shadow p-4 rounded" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <strong>Material Title</strong>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={material.title}
            onChange={handleInputChange}
            placeholder="Enter material title"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            <strong>Material Content</strong>
          </label>
          <ReactQuill
            theme="snow"
            value={material.content}
            onChange={handleContentChange}
            placeholder="Type your material content here..."
            style={{ height: '200px', marginBottom: '50px' }}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success px-4">Update Material</button>
        </div>
      </form>
    </div>
  );
}

export default EditMaterial;
