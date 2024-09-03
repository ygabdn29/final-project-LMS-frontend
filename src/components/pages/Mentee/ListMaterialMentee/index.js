import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ListMaterial = () => {
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

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {materials.length > 0 ? (
        <div>
          <h2>Materials for Course ID {courseId}</h2>
          <ul>
            {materials.map(material => (
              <li key={material.id}>
                <Link to={`/course/${courseId}/material/${material.id}`}>
                  <h3>{material.title}</h3>
                </Link>
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

export default ListMaterial;
