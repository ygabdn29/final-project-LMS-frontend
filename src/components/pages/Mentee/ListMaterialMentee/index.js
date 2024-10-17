import FE from '../../../../images/users/FE.png';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


let ListMaterialMentee = () => {
  const [materials, setMaterials] = useState([]);
  const { courseId } = useParams(); // Retrieve courseId from URL
  const DetailMaterialPage = '/dashboard/mentee/course/detailmaterial-page';
  const Home = '/dashboard/mentee';

  // Fetch materials based on the courseId
  useEffect(() => {
    if (courseId) {
      axios.get('http://localhost:8080/api/course/showMaterials', {
        headers: { id: courseId }
      })
        .then((response) => {
          if (response.data.message === "Success getting assigned course") {
            setMaterials(response.data.data);
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch materials:', error);
        });
    }
  }, [courseId]);

  return (
    <>

      <div className="row page-titles">
        <div className="col-md-6 col-8 align-self-center">
          <h3 className="text-themecolor m-b-0 m-t-0">Materials</h3>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={Home}>Home</Link></li>
            <li className="breadcrumb-item">Enroll</li>
            <li className="breadcrumb-item active">Materials</li>
          </ol>
        </div>
      </div>

      <div className="row">
        <section id="course-section">
          <h2>Materials Section</h2>
          <p>This is the course section. Scroll down to see more.</p>

          <div className="row">
            {materials.length > 0 ? (
              materials.map((material) => (
                <div className="col-md-4 my-4" key={material.id}>
                  <div className="p-4 border bg-white" style={{ borderRadius: '15%' }}>
                    <img src={FE} className="img-fluid my-3 w-100 rounded" alt="Material" />
                    <h2>{material.title}</h2>
                    <p>{material.content}</p>
                    <div className="d-flex justify-content-between col-md-12 my-3">
                      <button
                        type="button"
                        className="btn"
                        style={{ borderRadius: '100px' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        </svg>
                        Grade: <p className="grade" style={{ display: 'inline-block', margin: '0' }}>70</p>
                      </button>

                      <button
                        type="button"
                        className="btn btn-dark d-flex align-items-center justify-content-center"
                        style={{ borderRadius: '100px' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye mr-1" viewBox="0 0 16 16">
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                        </svg>
                        <Link to={`${DetailMaterialPage}/${material.id}`} style={{ color: 'white', textDecoration: 'none', marginLeft: '5px' }}>
                          View
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No materials assigned for this course.</p>
            )}
          </div>

        </section>
      </div>

    </>
  );
};

export default ListMaterialMentee;