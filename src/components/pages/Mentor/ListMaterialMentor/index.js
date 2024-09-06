import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';
import './style.css';

const ListMaterialMentor = () => {
  const { courseId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [editMaterial, setEditMaterial] = useState({
    id: '',
    title: '',
    content: ''
  });
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    content: ''
  });
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

  const handleEditClick = (material) => {
    setEditMaterial({
      id: material.id,
      title: material.title,
      content: material.content
    });
    setModalEdit(true);
  };

  const handleEditMaterial = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/course/${courseId}/edit-material/${editMaterial.id}`, editMaterial)
      .then(response => {
        console.log("Update Material Successfully", response.data);
        setModalEdit(false);
        fetchMaterials();
        navigate(`/mentor/course/${courseId}/materials`);
      })
      .catch(error => {
        setError("Failed to update material");
        console.error("Error updating material:", error);
      });
  };

  const handleAddMaterial = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/api/course/${courseId}/new-material`, newMaterial)
      .then(response => {
        console.log("Material Added Successfully", response.data);
        setModalCreate(false);
        setNewMaterial({ title: '', content: '' });
        fetchMaterials();
      })
      .catch(error => {
        setError("Failed to add material");
        console.error("Error adding material:", error);
      });
  };

  const handleEditChange = (e) => {
    setEditMaterial({
      ...editMaterial,
      [e.target.name]: e.target.value
    });
  };

  const handleAddChange = (e) => {
    setNewMaterial({
      ...newMaterial,
      [e.target.name]: e.target.value
    });
  };

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
            <button className="btn btn-success" onClick={() => {
              setNewMaterial({ title: '', content: '' });
              setModalCreate(true);
            }}>
              Add Material
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
                      <button className="btn btn-secondary mr-2" onClick={() => handleEditClick(material)}>
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

      <Modal show={modalEdit} onHide={() => setModalEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditMaterial}>
            <Form.Group controlId="formEditTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editMaterial.title}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formEditContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                name="content"
                value={editMaterial.content}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={modalCreate} onHide={() => setModalCreate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddMaterial}>
            <Form.Group controlId="formAddTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newMaterial.title}
                onChange={handleAddChange}
              />
            </Form.Group>
            <Form.Group controlId="formAddContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                name="content"
                value={newMaterial.content}
                onChange={handleAddChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Material
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListMaterialMentor;
