import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Material = () => {
  const { courseId, materialId } = useParams();
  const [material, setMaterial] = useState(null);
  const [error, setError] = useState('');

  const fetchMaterial = () => {
    axios.get(`http://localhost:8080/api/course/${courseId}/material/${materialId}`)
      .then(response => {
        if (response.data.status === 'OK') {
          setMaterial(response.data.data);
        } else {
          setError(response.data.message);
        }
        setError('');
      })
      .catch(error => {
        setError("Error fetching material");
        setMaterial(null);
        console.error("Error fetching material:", error);
      });
  }

  useEffect(() => {
    fetchMaterial();
  }, [courseId, materialId]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {material ? (
        <div>
          <h2>{material.title}</h2>
          <p>{material.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Material;
