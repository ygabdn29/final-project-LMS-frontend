import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import $, { data } from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";

let AccessCourseMentor = () => {
  const [dataCourse, setDataCourse] = useState(null);
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const userId = userDetails?.userID;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/course/assigned", {
        headers: { id: userId },
      })
      .then((response) => {
        setDataCourse(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if ($.fn.dataTable.isDataTable("#myTable")) {
      $("#myTable").DataTable().destroy();
    }

    if (dataCourse?.length > 0) {
      $("#myTable").DataTable({
        data: dataCourse,
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
          { data: "id", title: "No", width: "10%" },
          { data: "title", title: "Title", width: "70%" },
          {
            title: "Tindakan",
            width: "20%",
            render: (data, type, full, meta) => {
              let html = "";
              html += `
                 <a 
                    href="/dashboard/mentor/course/${full.id}/materials"
                    class="btn btn-info"
                  >
                    <span className="mr-1">
                      <i class="mdi mdi-settings"></i>
                    </span>
                      Kelola
                  </a>
                  
              `;
              return html;
            },
          },
        ],
      });
    }
  }, [dataCourse]);

  if (dataCourse === null) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/dashboard/mentor">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active">Course</li>
        </ol>
      </div>

      <div className="card">
        {console.log(dataCourse)}
        <div className="card-body">
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
      {/* <div className="card card-outline-info">
        <div className="card-header">
          <h3>Course Title:</h3>
          <h1>{dataCourse.title}</h1>
        </div>
        <div className="card-body">
          <h3>Description:</h3>
          <h4 className="mb-3">{dataCourse.description}</h4>

          <Link to="" className="btn btn-info">
            View Details
          </Link>
        </div>
      </div> */}
    </>
  );
};

export default AccessCourseMentor;
