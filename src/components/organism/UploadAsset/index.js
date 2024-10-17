import axios from "axios";
import React, { useState } from "react";

const UploadAsset = ({ setFetchStatus }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

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
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("File uploaded successfully!");
        setFetchStatus(true); // Trigger refetch in ListAsset
        setUploadProgress(0); // Reset progress after successful upload
      })
      .catch((error) => {
        console.log("Error uploading file:", error.message);
        alert("File upload failed!");
        setUploadProgress(0); // Reset progress after error
      });
  };

  return (
    <div className="container">
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

        {/* Progress Bar */}
        {uploadProgress > 0 && (
          <div className="progress m-t-30">
            Progress: {uploadProgress}% Complete
            <div
              className="progress-bar active progress-bar-striped bg-info"
              style={{ width: `${uploadProgress}%`, height: "8px" }}
              role="progressbar"
            >
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadAsset;
