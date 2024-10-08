import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import FormMaterialQuill from "../../../organism/FormMaterialQuill"; // Pastikan path-nya sesuai dengan file Anda
import axios from "axios";

const AddMaterial = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [course, setCourse] = useState("");
  const [error, setError] = useState("");

  const handleFormMaterial = (material) => {
    axios
      .post(
        `http://localhost:8080/api/course/${courseId}/new-material`,
        material
      )
      .then((response) => {
        setMessage(response.data.message);
        setError("");
        navigate(`/dashboard/mentor/course/${courseId}/materials`);
      })
      .catch((error) => {
        setError("Failed to add material");
        setMessage("");
        console.error("Failed to add material", error);
      });
  };

  const fetchCourse = () => {
    axios
      .get(`http://localhost:8080/api/course/${courseId}`)
      .then((response) => {
        setCourse(response.data.data);
        setError("");
      })
      .catch((error) => {
        setError("Failed to access course");
        setCourse("");
      });
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <>
      <div className="page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/dashboard/mentor">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/dashboard/mentor/course/${course?.id}/materials`}>
              Materials
            </Link>
          </li>
          <li className="breadcrumb-item active">New Material</li>
        </ol>
      </div>

      <div className="card card-outline-info">
        <div className="card-header">
          <h4 className="text-white mb-0">Course Detail</h4>
        </div>
        <div className="d-flex flex-column card-body">
          <label>
            Course Title:
            <span className="ml-2 font-bold">{`${course?.title}`}</span>
            {console.log(course)}
          </label>
          <label>
            Course Mentor:
            <span className="ml-2 font-bold">{`${course?.mentor?.username}`}</span>
          </label>
        </div>
      </div>
      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <FormMaterialQuill onSubmit={handleFormMaterial} />
    </>
  );
};

export default AddMaterial;
