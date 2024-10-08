import axios from "axios";
import React, { useState } from "react";

const UploadAsset = ({ setFetchStatus }) => { // Receiving setFetchStatus from props
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    axios
      .post("http://localhost:8080/api/cloudinary/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("File uploaded successfully!");
        setFetchStatus(true); // Trigger refetch in ListAsset
      })
      .catch((error) => {
        console.log("Error uploading file:", error.message);
        alert("File upload failed!");
      });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">File Upload</h4>
        <label htmlFor="input-file-now">
          Your so fresh input file — Default version
        </label>
        <input
          type="file"
          id="input-file-now"
          className="dropify"
          onChange={handleFileChange} 
        />
      </div>
      <button
        className="btn btn-info col-6 mx-auto mb-3"
        onClick={handleImageUpload} 
      >
        Submit
      </button>
    </div>
  );
};

export default UploadAsset;
