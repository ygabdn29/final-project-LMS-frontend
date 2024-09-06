import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './style.css';

const ListMaterial = () => {
  const { courseId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [course, setCourse] = useState('');
  const [error, setError] = useState('');

  const fetchMaterials = () => {
    axios.get(`http://localhost:8080/api/course/${courseId}/materials`)
      .then(response => {
        setMaterials(response.data.data);
        setError('');
      })
      .catch(error => {
        setError("Error fetching materials");
        setMaterials([]);
        console.error("Error fetching materials:", error);
      });
  }

  const fetchCourse = () => {
    axios.get(`http://localhost:8080/api/course/${courseId}`)
      .then(response => {
        setCourse(response.data.data.title);
        setError('')
      })
      .catch(error => {
        setError("Failed to access course: ");
        setCourse('');
      })
  }

  useEffect(() => {
    fetchMaterials();
    fetchCourse();
  }, [courseId]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="display-4">Materials for Course: <span className="text-info">{course}</span></h2>
      </div>
      {materials.length > 0 ? (
        <ul className="list-group">
          {materials.map(material => (
            <li key={material.id} className="list-group-item">
              <div className="d-flex flex-column">
                <h5 className="mb-1">{material.title}</h5>
                <p className="mb-1">
                  {material.content.length > 150
                    ? `${material.content.slice(0, 150)}...`
                    : material.content}
                </p>
                <Link to={`/course/${courseId}/material/${material.id}`}>
                  <button className="btn btn-info">View Material</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="alert alert-info">No materials found</div>
      )}
    </div>
  );
};

export default ListMaterial;
