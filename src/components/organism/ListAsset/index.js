import axios from "axios";
import { useEffect, useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const ListAsset = ({ fetchStatus, setFetchStatus }) => {
  const [dataImages, setDataImages] = useState([]);

  const fetchAsset = () => {
    axios
      .get("http://localhost:8080/api/cloudinary/get")
      .then((response) => {
        setDataImages(response.data.data);
        setFetchStatus(false);
      })
      .catch((error) => {
        console.log("Error Image Fetching: ", error.message);
      });
  };

  useEffect(() => {
    if (fetchStatus === true) {
      fetchAsset();
    }
  }, [fetchStatus]);

  return (
    <div className="container">
      <main>
        <table className="table color-table info-table" id="tableCourse">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataImages.map((image) => (
              <tr key={image.id}>
                <td>{image.id}</td>
                <td>
                  <img
                    src={image.path}
                    alt={`Image ${image.id}`}
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
                <td className="text-center">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="button-tooltip">Edit</Tooltip>}
                  >
                    <Button
                      className="text-decoration-none rounded text-light bg-warning px-4 py-1 mr-4"
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
  );
};

export default ListAsset;
