import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

let ListCoursesAdmin = () => {
  const [dataCourses, setDataCourses] = useState([]);
  const [dataMentors, setDataMentors] = useState([]);
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

  useEffect(() => {
    fetchCourses();
  }, []);

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

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/account/mentors")
      .then((response) => {
        setDataMentors(response.data.data);
      })
      .catch((error) => {
        console.error("Error getting list mentors: ", error);
      });
  }, []);

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
        <header>
          <h1 className="text-center mt-4">Course Management</h1>
        </header>
        <main>
          <Button
            variant="success"
            className="text-decoration-none rounded text-light bg-success px-4 py-1 mb-3"
            onClick={() => setShowCreateModal(true)}
          >
            Create Course
          </Button>
          <table className="table color-table dark-table" id="tableCourse">
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
                    <Button
                      className="text-decoration-none rounded text-light bg-warning px-4 py-1 mr-4"
                      onClick={() => handleEditClick(course)}
                      variant="warning"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="text-decoration-none rounded text-light bg-danger px-4 py-1"
                      onClick={() => handleDeleteClick(course)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
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
        <Modal.Header closeButton>
          <Modal.Title>Create Course</Modal.Title>
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
                {dataMentors.map((mentor) => (
                  <option key={mentor.id} value={mentor.id}>
                    {mentor.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Course
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ListCoursesAdmin;
