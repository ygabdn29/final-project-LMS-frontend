import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import './style.css';

const ListMaterialMentor = () => {
  const { courseId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [course, setCourse] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchMaterials = () => {
    axios.get(`http://localhost:8080/api/course/${courseId}/materials`)
      .then(response => {
        setMaterials(response.data.data);
        setError('');
      })
      .catch(error => {
        setError("Error fetching materials");
        setMaterials([]);
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
    fetchMaterials();
  }, [courseId]);

  const handleDelete = (materialId) => {
    const deleteMaterial = window.confirm("Are you sure you want to delete this material?");
    if (deleteMaterial) {
      axios.delete(`http://localhost:8080/api/course/${courseId}/material/${materialId}`)
        .then(response => {
          setMaterials(materials.filter(material => material.id !== materialId));
          setError('');
        })
        .catch(error => {
          setError("Failed to delete material");
          console.error("Error deleting material:", error);
        });
    }
  };

  return (
    <div className="container mt-4">
      {materials.length > 0 ? (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1><strong>{course}</strong></h1>
            <button
              className="btn btn-success"
              onClick={() => navigate(`/mentor/course/${courseId}/new-material`)}> Add Material
            </button>
          </div>
          <div className="row">
            {materials.map(material => (
              <div key={material.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body card-body-fixed">
                    <h2 className="card-title">{material.title}</h2>
                    <p className="card-description">
                      {material.content.length > 250
                        ? `${material.content.slice(0, 250)}...`
                        : material.content}
                    </p>
                    <div className="button-group">
                      <Link to={`/mentor/course/${courseId}/material/${material.id}`}>
                        <button className="btn btn-info mr-2">Add Assignment</button>
                      </Link>
                      <button
                        className="btn btn-secondary mr-2"
                        onClick={() => navigate(`/mentor/course/${courseId}/edit-material/${material.id}`)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-danger mr-2" onClick={() => handleDelete(material.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No materials found</p>
      )}
    </div>
  );
};

export default ListMaterialMentor;
