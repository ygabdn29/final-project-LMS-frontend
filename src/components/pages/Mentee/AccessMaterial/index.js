import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from 'dompurify';

const MaterialDetail = () => {
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
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        {material ? (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h1 className="mb-0">Material - {material.title}</h1>
                </div>
                <div className="card-body text-start">
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(material.content) }} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialDetail;
