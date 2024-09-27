import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./style.css";
import $ from "jquery";
import "datatables.net";

const ListMaterialMentor = () => {
  const { courseId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [course, setCourse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchMaterials = () => {
    axios
      .get(`http://localhost:8080/api/course/${courseId}/materials`)
      .then((response) => {
        setMaterials(response.data.data);
        setError("");
      })
      .catch((error) => {
        setError("Error fetching materials");
        setMaterials([]);
      });
  };

  const fetchCourse = () => {
    axios
      .get(`http://localhost:8080/api/course/${courseId}`)
      .then((response) => {
        setCourse(response.data.data.title);
        setError("");
      })
      .catch((error) => {
        setError("Failed to access course");
        setCourse("");
      });
  };

  useEffect(() => {
    fetchCourse();
    fetchMaterials();
  }, [courseId]);

  useEffect(() => {
    if (materials.length > 0) {
      $("#myTable").DataTable({
        data: materials,
        columnDefs: [
          {
            target: [0],
            visible: true,
            searchable: true,
          },
          {
            target: [2],
            searchable: false,
            className: "text-center",
          },
        ],
        columns: [
          { data: "id", title: "No" },
          { data: "title", title: "Title" },
          {
            title: "Tindakan",
            render: (data, type, full, meta) => {
              let html = "";
              html += `
                 <a 
                    href="/dashboard/mentor/course/1/material/${full.id}/assignments"
                    class="btn btn-info"
                  >
                    <span className="mr-1">
                      <i class="mdi mdi-settings"></i>
                    </span>
                      Kelola
                  </a>
                  <a
                    href="/dashboard/mentor/course/${courseId}/edit-material/${full.id}"
                    class="btn btn-warning mr-3"
                  >
                    <span className="mr-1">
                      <i className="mdi mdi-pencil"></i>
                    </span>
                    Sunting
                  </a>
              `;
              return html;
            },
          },
        ],
      });
    }

    // return () => {
    //   if ($.fn.dataTable.isDataTable("#myTable")) {
    //     $("#myTable").DataTable().destroy(true);
    //   }
    // };
  }, [materials]);

  const handleDelete = (materialId) => {
    const deleteMaterial = window.confirm(
      "Are you sure you want to delete this material?"
    );
    if (deleteMaterial) {
      axios
        .delete(
          `http://localhost:8080/api/course/${courseId}/material/${materialId}`
        )
        .then((response) => {
          setMaterials(
            materials.filter((material) => material.id !== materialId)
          );
          setError("");
        })
        .catch((error) => {
          setError("Failed to delete material");
          console.error("Error deleting material:", error);
        });
    }
  };

  return (
    <>
      {console.log(materials)}
      {materials.length > 0 ? (
        <div>
          <div className="page-titles">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard/mentor">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/dashboard/mentor">{course}</Link>
              </li>
              <li className="breadcrumb-item active">Materials</li>
            </ol>
          </div>

          <div className="table-responsive">
            <div id="mytable-wrapper" className="dataTables_warapper no-footer">
              <div className="dataTables_length" id="myTable_length"></div>
              <div className="dataTables_filter" id="myTable_filter"></div>
              <table
                id="myTable"
                className="table table-bordered color-bordered-table info-bordered-table text-dark "
                role="grid"
                aria-describedby="myTable_info"
              ></table>
              <div
                className="dataTables_info"
                id="myTable_info"
                role="status"
                aria-live="polite"
              ></div>
              <div className="dataTables_paginate paging_simple_numbers"></div>
            </div>
          </div>

          <div>
            <button className="btn btn-success mb-3">
              <i className="mdi mdi-plus"></i>
              New Material
            </button>

            <div className="table-responsive">
              <table className="table table-bordered color-bordered-table info-bordered-table text-dark">
                <thead>
                  <tr>
                    <th style={{ width: "80%" }}>Title</th>
                    <th className="text-center" style={{ width: "20%" }}>
                      Tindakan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((material, id) => {
                    return (
                      <tr key={id}>
                        <td>{material.title}</td>
                        <td className="text-center">
                          <Link
                            to={`/dashboard/mentor/course/${courseId}/edit-material/${material.id}`}
                            className="btn btn-warning mr-3"
                          >
                            <span className="mr-1">
                              <i className="mdi mdi-pencil"></i>
                            </span>
                            Sunting
                          </Link>
                          <Link
                            to={`/dashboard/mentor/course/1/material/${material.id}/assignments`}
                            className="btn btn-info"
                          >
                            <span className="mr-1">
                              <i className="mdi mdi-settings"></i>
                            </span>
                            Kelola
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <p>No materials found</p>
      )}
    </>
  );
};

export default ListMaterialMentor;
