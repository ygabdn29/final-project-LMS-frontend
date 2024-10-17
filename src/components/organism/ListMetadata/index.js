import axios from "axios";
import { useEffect, useState } from "react";
import { Button, OverlayTrigger, Tooltip, Form, Modal } from "react-bootstrap";

const ListMetadata = () => {
  const [fetchStatus, setFetchStatus] = useState(true);
  const [metadata, setMetadata] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [updatedMetadata, setUpdatedMetadata] = useState({
    id: "",
    category: "",
    name: "",
    value: "",
  });

  const [newMetadata, setNewMetadata] = useState({
    category: "",
    name: "",
    value: "",
  });

  const fetchMetadata = () => {
    axios
      .get("http://localhost:8080/api/metadata/get")
      .then((response) => {
        setMetadata(response.data.data);
        setFetchStatus(false);
      })
      .catch((error) => {
        console.log("Error data Fetching: ", error.message);
      });
  };

  const handleCreateMetadata = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/metadata/create", newMetadata)
      .then((response) => {
        console.log("Metadata created successfully: ", response.data);
        setShowCreateModal(false);
        fetchMetadata();
      })
      .catch((error) => {
        console.error("Error creating metadata: ", error);
      });
  };

  const handleNewMetadataChange = (e) => {
    setNewMetadata({
      ...newMetadata,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = (metadata) => {
    setUpdatedMetadata({
      id: metadata.id,
      name: metadata.name,
      value: metadata.value,
      category: metadata.category,
    });
    setShowEditModal(true);
  };

  const handleEditMetadata = (e) => {
    e.preventDefault();
    const { id, name, value, category } = updatedMetadata; // Destructure id

    axios
      .post(`http://localhost:8080/api/metadata/edit/${id}`, {
        name,
        value,
        category,
      })
      .then((response) => {
        console.log("Metadata updated successfully: ", response.data);
        fetchMetadata();
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error("Error updating metadata: ", error);
      });
  };

  const handleEditMetadataChange = (e) => {
    setUpdatedMetadata({
      ...updatedMetadata,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (fetchStatus === true) {
      fetchMetadata();
    }
  }, [fetchStatus]);

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <main>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="button-tooltip">Tambah Metadata</Tooltip>}
              >
                <Button
                  variant="success"
                  className="d-flex align-items-center rounded px-4 py-2 mb-3 mt-2"
                  onClick={() => setShowCreateModal(true)}
                >
                  <i className="fa fa-plus"></i>
                </Button>
              </OverlayTrigger>
              <table
                className="table color-table info-table"
                id="tableMetadata"
              >
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Value</th>
                    <th>Kategori</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {metadata.map((data) => (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.name}</td>
                      <td>
                        <img
                          src={data.value}
                          alt={`data ${data.id}`}
                          style={{ width: "100px", height: "auto" }}
                        />
                      </td>
                      <td>{data.category}</td>
                      <td className="text-center">
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip id="button-tooltip">Edit</Tooltip>}
                        >
                          <Button
                            className="text-decoration-none rounded text-light bg-warning px-4 py-1 mr-4"
                            variant="warning"
                            onClick={() => handleEditClick(data)}
                          >
                            <i className="fa fa-pencil"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </main>
          </div>
        </div>
      </div>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header>
          <Modal.Title>Edit Metadata</Modal.Title>
          <button
            type="button"
            className="close"
            aria-hidden={!showEditModal}
            style={{ cursor: "pointer" }}
            onClick={() => setShowEditModal(false)}
          >
            ×
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditMetadata}>
            <Form.Group
              controlId="formEditMetadataId"
              style={{ display: "none" }}
            >
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={updatedMetadata.id}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formEditName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updatedMetadata.name}
                onChange={handleEditMetadataChange}
              />
            </Form.Group>
            <Form.Group controlId="formEditValue">
              <Form.Label>Value (Image URL)</Form.Label>
              <Form.Control
                type="text"
                name="value"
                value={updatedMetadata.value}
                onChange={handleEditMetadataChange}
              />
            </Form.Group>
            <Form.Group controlId="formEditCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={updatedMetadata.category}
                onChange={handleEditMetadataChange}
              />
            </Form.Group>
            <Button variant="success" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header>
          <Modal.Title>Tambah Metadata</Modal.Title>
          <button
            type="button"
            className="close"
            aria-hidden={!showCreateModal}
            style={{ cursor: "pointer" }}
            onClick={() => setShowCreateModal(false)}
          >
            ×
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateMetadata}>
            <Form.Group
              controlId="formCreateMetadataId"
              style={{ display: "none" }}
            >
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={newMetadata.id}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formCreateName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newMetadata.name}
                onChange={handleNewMetadataChange}
              />
            </Form.Group>
            <Form.Group controlId="formCreateValue">
              <Form.Label>Value (Image URL)</Form.Label>
              <Form.Control
                type="text"
                name="value"
                value={newMetadata.value}
                onChange={handleNewMetadataChange}
              />
            </Form.Group>
            <Form.Group controlId="formEditCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={newMetadata.category}
                onChange={handleNewMetadataChange}
              />
            </Form.Group>
            <Button variant="success" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ListMetadata;
