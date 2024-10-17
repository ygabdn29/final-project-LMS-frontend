import FE from '../../../images/users/FE.png';
import Layout from '../../Layout';
import TopNavbar from '../../templates/topNavbar';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export let CourseMentee = () => {
  const [courses, setCourses] = useState([]);
  const Home = '/dashboard/mentee';

  // Fetch course data from the API
  useEffect(() => {
    axios.get('http://localhost:8080/api/course')
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.error('Failed to fetch courses:', error);
      });
  }, []);

  // Function to handle SweetAlert and enrollment API call
  const handleEnroll = (courseId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Enroll it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Replace with actual user ID
        const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        const userId = userDetails ? userDetails.userID : null;

        axios.post('http://localhost:8080/api/course/enroll', { courseId, userId })
          .then((response) => {
            Swal.fire('Enroll!', 'Successfully Enrolled.', 'success').then(() => {
              window.location.href = '/dashboard/mentee/course/list';
            });
          })
          .catch((error) => {
            Swal.fire('Error', 'Error when enrolling course', 'error');
            console.error('Failed to enroll:', error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: 'Cancelled',
          text: 'Cancelled Enrollment',
          icon: 'error',
        });
      }
    });
  };

  return (
    <>

      <div>
        <div className="page-wrapper">
          <div className="container-fluid bg-light">
            <div className="row page-titles">
              <div className="col-md-6 col-8 align-self-center">
                <h3 className="text-themecolor m-b-0 m-t-0">Course</h3>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to={Home}>Home</Link></li>
                  <li className="breadcrumb-item active">Course</li>
                </ol>
              </div>
            </div>

            <div className='row'>
              <div className='row'>
                {courses.map((course) => (
                  <div className="col-md-4 col-sm-6 my-4" key={course.id}>
                    <div className="p-3 border border-dark bg-white" style={{ borderRadius: '15%' }}>
                      <img src={FE} className="img-fluid my-3 w-100" alt="Course" />
                      <h2>{course.name}</h2>
                      <p>{course.description}</p>
                      <div className="text-right col-md-12">
                        <button type="button" className="btn btn-dark sweet d-flex align-items-center justify-content-center" onClick={() => handleEnroll(course.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-add me-2" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
                            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"></path>
                          </svg>
                          Enroll
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <footer className="footer">
              © 2017 Monster Admin by wrappixel.com
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};
