import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const ListMentee = () => {
  const [dataMentee, setDataMentee] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(true);

  const handleActive = (id) => {
    axios.get(`http://localhost:8080/api/account/setActive/${id}`)
    .then((response) => {
        console.log(response.message)
        setFetchStatus(true);
    })
    .catch((error) =>{
        console.log(error.message);
    })
    setFetchStatus(false);
  }
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
    if(fetchStatus == true){
        fetchMentee();
    }
  }, [fetchStatus]);

  return (
    <>
      <div className="container">
      <div className="card">
      <div className="card-body">
        <h4 className="card-title">Kelola Aktivasi Pengguna</h4>
        <main>
          <table className="table color-table info-table" id="tableCourse">
            <thead className="table-dark">
              <tr>
                <th>Nama Pengguna</th>
                <th>Status</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataMentee.map((mentee) => (
                <tr key={mentee.id}>
                  <td>{mentee.username}</td>
                  <td>{mentee.isActive == 0 ? "Tidak Aktif" : "Aktif" }</td>
                  <td className="text-center">
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="button-tooltip">{mentee.isActive == 0 ? "Aktifkan" : "Blokir" }</Tooltip>
                      }
                    >
                      <Button
                        variant={mentee.isActive == 0 ? "success" : "danger"}
                        className={mentee.isActive == 0 ? "text-decoration-none rounded text-light bg-success px-4 py-1" : "text-decoration-none rounded text-light bg-danger px-4 py-1"}
                        onClick={() => handleActive(mentee.id)}
                      >
                        <i className={mentee.isActive == 0  ? "fa fa-check" : "fa fa-ban"}></i>
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
    </>
  );
};

export default ListMentee;
