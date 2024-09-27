import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditMaterial = () => {
  const { courseId, materialId } = useParams();
  const [material, setMaterial] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const quillRef = useRef(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/course/${courseId}/material/${materialId}`
      )
      .then((response) => {
        setMaterial(response.data.data);
        setError("");
      })
      .catch((error) => {
        setError("Error fetching material data");
        console.error("Error fetching material:", error);
      });
  }, [courseId, materialId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8080/api/course/${courseId}/edit-material/${materialId}`,
        material
      )
      .then((response) => {
        console.log("Updated Material Successfully", response.data);
        navigate(`/dashboard/mentor/course/${courseId}/materials`);
      })
      .catch((error) => {
        setError("Failed to update material");
        console.error("Error updating material:", error);
      });
  };

  const handleBack = () => {
    navigate(`/dashboard/mentor/course/${courseId}/materials`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial((material) => ({
      ...material,
      [name]: value,
    }));
  };

  const handleContentChange = (value) => {
    setMaterial((material) => ({
      ...material,
      content: value,
    }));
  };

  return (
    <div className="container mt-4">
      <div className="page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/dashboard/mentor">Dashboard</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/dashboard/mentor">Course</a>
          </li>
          <li className="breadcrumb-item">
            <a href="" onClick={handleBack}>
              Materials
            </a>
          </li>
          <li className="breadcrumb-item active">Edit</li>
        </ol>
      </div>

      <form
        className="form-group shadow p-4 rounded"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <h4 className="text-center">Course Detail</h4>
        <div className="mb-3">
          <label htmlFor="firstName" className="mb-2 align-self-start">
            <strong>Course Title:</strong>
          </label>
          <input
            type="text"
            className="form-control"
            value={material?.course?.title}
            disabled
            readOnly={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstName" className="mb-2 align-self-start">
            <strong>Course Description:</strong>
          </label>
          <textarea
            className="form-control"
            value={material?.course?.description}
            disabled
            readOnly={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstName" className="mb-2 align-self-start">
            <strong>Mentor:</strong>
          </label>
          <input
            type="text"
            className="form-control"
            value={material.course?.mentor.username}
            disabled
            readOnly={true}
          />
        </div>
      </form>
      {console.log(material)}
      <form
        onSubmit={handleSubmit}
        className="form-group shadow p-4 rounded"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <h4 className="text-center">Edit Material</h4>
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
            onChange={(e) => handleChange(e)}
            placeholder={material.title}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            <strong>Material Content</strong>
          </label>
          <ReactQuill
            theme="snow"
            value={material.content}
            onChange={(e) => handleContentChange(e)}
            placeholder="Type your material content here..."
            style={{ height: "200px", marginBottom: "50px" }}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success px-4 mt-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMaterial;
