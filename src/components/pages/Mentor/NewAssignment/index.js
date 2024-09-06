import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function NewAssignment() {
  const { courseId, materialId } = useParams();
  const [name, setName] = useState();
  const [content, setContent] = useState();
  const [passingScore, setPassingScore] = useState();
  const [dueDate, setDueDate] = useState();

  return (
    <>
      <form
        onSubmit={(e) =>
          handleSubmit(
            e,
            name,
            content,
            passingScore,
            dueDate,
            courseId,
            materialId
          )
        }
      >
        <div className="d-flex flex-column">
          <label htmlFor="name" className="mb-2 align-self-start">
            Assignment Title:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="content">Content: </label>
          <input
            className="form-control"
            type="text"
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="passingScore">Passing Score: </label>
          <input
            className="form-control"
            type="number"
            id="passingScore"
            name="passingScore"
            value={passingScore}
            onChange={(e) => setPassingScore(e.target.value)}
            required
          />
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="dueDate">Due Date: </label>
          <input
            className="form-control"
            type="date"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-success waves-effect waves-light align-self-start mt-3"
        >
          Submit
        </button>
      </form>
    </>
  );
}

function handleSubmit(
  e,
  name,
  content,
  passingScore,
  dueDate,
  courseId,
  materialId
) {
  e.preventDefault();
  axios
    .post(
      `http://localhost:8080/api/course/${courseId}/material/${materialId}/assignment/new`,
      {
        name: name,
        content: content,
        dueDate: dueDate,
        passingScore: passingScore,
        materialId: materialId,
      }
    )
    .then((response) => alert(response.data.message))
    .catch((error) => alert(error));
}
export default NewAssignment;
