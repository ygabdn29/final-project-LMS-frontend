import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ListMaterialMentor = () => {
  const { courseId } = useParams();
  const [materials, setMaterials] = useState([]);
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

  useEffect(() => {
    fetchMaterials();
  }, [courseId]);

  const handleDelete = (materialId) => {
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

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {materials.length > 0 ? (
        <div>
          <h2>Materials for Course ID {courseId}</h2>
          <Link to={`/course/${courseId}/new-material`}>
            <button>Add Material</button>
          </Link>
          <ul>
            {materials.map(material => (
              <li key={material.id}>
                <Link to={`/mentor/course/${courseId}/material/${material.id}`}>
                  <h3>{material.title}</h3>
                </Link>
                <Link to={`/course/${courseId}/edit-material/${material.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(material.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No materials found</p>
      )}
    </div>
  );
};

export default ListMaterialMentor;
