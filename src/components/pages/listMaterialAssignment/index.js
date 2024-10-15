import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

function ListMaterialAssignment() {
  const [assignments, setAssignments] = useState();
  const { courseId, materialId } = useParams();
  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/course/${courseId}/material/${materialId}/assignment`
      )
      .then((response) => setAssignments(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if ($.fn.dataTable.isDataTable("#myTable")) {
      $("#myTable").DataTable().destroy();
    }

    if (assignments?.length > 0) {
      $("#myTable").DataTable({
        data: assignments,
        columnDefs: [
          {
            target: [0],
            visible: true,
            searchable: true,
          },
          {
            target: [2],
            searchable: false,
            orderable: false,
            className: "text-center",
          },
        ],
        columns: [
          { data: "id", title: "No", width: "1%" },
          { data: "name", title: "Title", width: "79%" },
          {
            title: "Tindakan",
            width: "20%",
            render: (data, type, full, meta) => {
              let html = "";
              html += `
                  <a
                    href="/dashboard/mentor/course/${courseId}/material/${materialId}/assignment/edit-assignment/${full.id}"
                    class="btn btn-warning mr-3"
                  >
                    <span className="mr-1">
                      <i class="mdi mdi-pencil"></i>
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
  }, [assignments]);

  return (
    <div>
      <div className="page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/dashboard/mentor">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/dashboard/mentor">
              {assignments?.[0].material?.course?.title}
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/dashboard/mentor/course/${courseId}/materials`}>
              {assignments?.[0].material?.title}
            </Link>
          </li>
          <li className="breadcrumb-item active">Assignments</li>
        </ol>
      </div>

      <div className="card">
        <div className="card-body">
          <Link
            to={`/dashboard/mentor/course/${courseId}/material/${materialId}/new-assignment`}
            className="btn btn-success text-light align-self-start"
            style={{ marginBottom: "-0.5rem" }}
          >
            <i className="mdi mdi-plus"></i>
            Tugas
          </Link>
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
        </div>
      </div>

      {/* <div className="table-responsive">
        <table className="table table-bordered color-bordered-table info-bordered-table text-dark">
          <thead>
            <tr>
              <th style={{ width: "80%" }}>Title</th>
              <th className="text-center" style={{ width: "20%" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {assignments?.map((assignment, id) => {
              return (
                <tr key={id}>
                  <td>{assignment.name}</td>
                  <td className="text-center">
                    <Link to={``} className="btn btn-warning">
                      <span className="mr-1">
                        <i className="mdi mdi-pencil"></i>
                      </span>
                      Sunting
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}
    </div>
  );
}

export default ListMaterialAssignment;
