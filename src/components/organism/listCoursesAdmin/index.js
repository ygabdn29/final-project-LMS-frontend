import axios from "axios";
import { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

let ListCoursesAdmin = () => {
  const [dataCourses, setDataCourses] = useState([]);
  const [dataMentors, setDataMentors] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(true);
  const [dataUsers, setDataUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState({
    id: "",
    title: "",
    description: "",
    mentorId: "",
  });
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    mentorId: "",
  });

  const fetchCourses = () => {
    axios
      .get("http://localhost:8080/api/course")
      .then((response) => {
        setDataCourses(response.data.data);
      })
      .catch((error) => {
        console.log("Error getting list of courses: ", error);
      });
  };

  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/api/account/mentees")
      .then((response) => {
        setDataUsers(response.data.data);
        console.log("Data User: ", response.data.data);
      })
      .catch((error) => {
        console.log("Error msg: ", error.message);
      });
    setFetchStatus(false);
  };

  const fetchMentors = () => {
    axios
      .get("http://localhost:8080/api/account/mentors")
      .then((response) => {
        setDataMentors(response.data.data);
        console.log("Response Edit Mentor : ", response.data.data);
      })
      .catch((error) => {
        console.log("Error msg: ", error.message);
      });
  };

  useEffect(() => {
    if (fetchStatus == true) {
      fetchCourses();
      fetchUsers();
      fetchMentors();
    }
  }, [fetchStatus]);

  const handleCreateCourse = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/course/create", newCourse)
      .then((response) => {
        console.log("Course created successfully: ", response.data);
        setShowCreateModal(false);
        fetchCourses();
      })
      .catch((error) => {
        console.error("Error creating course: ", error);
      });
  };

  const handleNewCourseChange = (e) => {
    setNewCourse({
      ...newCourse,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = (course) => {
    setUpdatedCourse({
      id: course.id,
      title: course.title,
      description: course.description,
      mentorId: course.mentor.id,
    });
    setShowEditModal(true);
  };

  const handleEditCourse = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/course/update", updatedCourse)
      .then((response) => {
        console.log("Course updated successfully: ", response.data);
        fetchCourses();
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error("Error updating course: ", error);
      });
  };

  const handleEditCourseChange = (e) => {
    setUpdatedCourse({
      ...updatedCourse,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteClick = (course) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this course (${course.title})?`
    );
    if (confirmDelete) {
      axios
        .delete("http://localhost:8080/api/course/delete", {
          headers: { id: course.id },
        })
        .then((response) => {
          console.log("Course deleted successfully: ", response.data);
          fetchCourses();
        })
        .catch((error) => {
          console.error("Error deleting course: ", error);
        });
    }
  };

  if (dataCourses === null) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="container">
        <div className="page-titles p-b-0">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Course management</li>
            <li className="breadcrumb-item">
              <a href="#">Page 2</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Page 3</a>
            </li>
          </ol>
        </div>

        <main>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="button-tooltip">Create Course</Tooltip>}
          >
            <Button
              variant="success"
              className="d-flex align-items-center rounded px-4 py-2 mb-3 mt-2"
              onClick={() => setShowCreateModal(true)}
            >
              <i className="fa fa-plus"></i>
            </Button>
          </OverlayTrigger>

          <table className="table color-table info-table" id="tableCourse">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Mentor</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {dataCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>{course.mentor.username}</td>
                  <td className="text-center ">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id="button-tooltip">Edit</Tooltip>}
                    >
                      <Button
                        className="text-decoration-none rounded text-light bg-warning px-4 py-1 mr-4"
                        onClick={() => handleEditClick(course)}
                        variant="warning"
                      >
                        <i className="fa fa-pencil"></i>
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id="button-tooltip">Delete</Tooltip>}
                    >
                      <Button
                        variant="danger"
                        className="text-decoration-none rounded text-light bg-danger px-4 py-1"
                        onClick={() => handleDeleteClick(course)}
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

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header>
          <Modal.Title>Edit Course</Modal.Title>
          <button
            type="button"
            className="close"
            aria-hidden={!showEditModal}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowEditModal(false);
            }}
          >
            ×
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditCourse}>
            <Form.Group controlId="formEditCourseId">
              <Form.Label>Course ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={updatedCourse.id}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formEditTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={updatedCourse.title}
                onChange={handleEditCourseChange}
              />
            </Form.Group>
            <Form.Group controlId="formEditDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={updatedCourse.description}
                onChange={handleEditCourseChange}
              />
            </Form.Group>
            <Form.Group controlId="formEditMentor">
              <Form.Label>Mentor</Form.Label>
              <Form.Control
                as="select"
                name="mentorId"
                value={updatedCourse.mentorId}
                onChange={handleEditCourseChange}
              >
                <option value="" disabled>
                  Select Mentor
                </option>
                {dataMentors.map((mentor) => (
                  <option key={mentor.id} value={mentor.id}>
                    {mentor.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="success" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header>
          <Modal.Title>Create Course</Modal.Title>
          <button
            type="button"
            className="close"
            aria-hidden={!showCreateModal}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowCreateModal(false);
            }}
          >
            ×
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateCourse}>
            <Form.Group controlId="formCreateTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newCourse.title}
                onChange={handleNewCourseChange}
              />
            </Form.Group>
            <Form.Group controlId="formCreateDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newCourse.description}
                onChange={handleNewCourseChange}
              />
            </Form.Group>
            <Form.Group controlId="formCreateMentor">
              <Form.Label>Mentor</Form.Label>
              <Form.Control
                as="select"
                name="mentorId"
                value={newCourse.mentorId}
                onChange={handleNewCourseChange}
              >
                <option value="" disabled>
                  Select Mentor
                </option>
                {dataUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="success" type="submit" className="mt-3">
              Create Course
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ListCoursesAdmin;

//listCourseAdmin