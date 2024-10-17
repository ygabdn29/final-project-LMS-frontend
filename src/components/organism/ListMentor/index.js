import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, OverlayTrigger, Tooltip, Form, Modal } from "react-bootstrap";

const ListMentor = () => {
  const [dataMentor, setDataMentor] = useState([]);
  const [dataMentee, setDataMentee] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(true);
  const [selectedMenteeId, setSelectedMenteeId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteMentor = (id) => {
    console.log("Deleting mentor with ID: ", id);
    axios
      .get(`http://localhost:8080/api/account/delete/${id}`)
      .then((response) => {
        console.log(response.message);
        setFetchStatus(true);
      })
      .catch((error) => {
        console.log("Error delete user: ", error.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const menteeId = selectedMenteeId;
    axios
      .post(`http://localhost:8080/api/account/addMentor`, null, {
        params: { menteeId },
      })
      .then((response) => {
        console.log(response.data.message);
        setFetchStatus(true);
      })
      .catch((error) => {
        console.error("Error adding mentor: ", error.message);
      });
  };

  const fetchMentor = () => {
    axios
      .get("http://localhost:8080/api/account/mentors")
      .then((response) => {
        setDataMentor(response.data.data);
        setFetchStatus(false);
      })
      .catch((error) => {
        console.log("Error fetching mentor: ", error.message);
      });
  };

  const fetchMentee = () => {
    axios
      .get("http://localhost:8080/api/account/mentees")
      .then((response) => {
        setDataMentee(response.data.data);
        setFetchStatus(false);
      })
      .catch((error) => {
        console.log("Error fetching mentee: ", error.message);
      });

    setFetchStatus(true);
  };

  useEffect(() => {
    if (fetchStatus == true) {
      fetchMentor();
      fetchMentee();
    }
  }, [fetchStatus]);

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Kelola Mentor</h4>
            <main>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="button-tooltip">Tambah Mentor</Tooltip>}
              >
                <Button
                  variant="success"
                  className="d-flex align-items-center rounded px-4 py-2 mb-3 mt-2"
                  onClick={() => setShowModal(true)}
                >
                  <i className="fa fa-plus"></i>
                </Button>
              </OverlayTrigger>
              <table className="table color-table info-table" id="tableCourse">
                <thead className="table-dark">
                  <tr>
                    <th>No</th>
                    <th>Nama Pengguna</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataMentor.map((mentor, index) => (
                    <tr key={mentor.id}>
                      <td>{index + 1}</td>
                      <td>{mentor.username}</td>
                      <td className="text-center">
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip id="button-tooltip">Hapus</Tooltip>}
                        >
                          <Button
                            variant="danger"
                            className="text-decoration-none rounded text-light bg-danger px-4 py-1"
                            onClick={() => handleDeleteMentor(mentor.id)}
                          >
                            <i className="fa fa-trash-o"></i>
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Tambah Mentor</Modal.Title>
          <button
            type="button"
            className="close"
            aria-hidden={!showModal}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowModal(false);
            }}
          >
            ×
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {" "}
            {/* Attach handleSubmit here */}
            <Form.Group controlId="formCreateMentor">
              <Form.Label>Nama Pengguna</Form.Label>
              <Form.Control
                as="select"
                name="mentorId"
                onChange={(e) => setSelectedMenteeId(e.target.value)} // Update selected mentee ID
              >
                <option value="" disabled>
                  Pilih Pengguna
                </option>
                {dataMentee.map((mentee) => (
                  <option key={mentee.id} value={mentee.id}>
                    {mentee.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="success" type="submit" className="mt-3">
              Tambah
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ListMentor;
