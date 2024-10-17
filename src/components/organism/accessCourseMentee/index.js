import FE from '../../../images/users/FE.png';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export let AccessCourseMentee = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const MaterialsPageMentee = '/dashboard/mentee/course/materials-page';
    const Home = '/dashboard/mentee';
    const navigate = useNavigate(); // useNavigate hook for navigation

    useEffect(() => {
        // Retrieve user details from sessionStorage
        const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        const userId = userDetails ? userDetails.userID : null;

        if (userId) {
            // Fetch enrolled courses based on the logged-in user's ID
            axios.get('http://localhost:8080/api/course/enrolled', {
                headers: { id: userId }
            })
                .then((response) => {
                    if (response.data.message === "Success getting enrolled courses") {
                        setEnrolledCourses(response.data.data);
                    } else {
                        console.log(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error('Failed to fetch enrolled courses:', error);
                });
        } else {
            console.error('User ID not found. Please log in again.');
        }
    }, []);

    // Function to navigate to the materials page with courseId as a parameter
    const handleDetailClick = (courseId) => {
        navigate(`${MaterialsPageMentee}/${courseId}`);
    };

    return (
        <>
            <div className="row page-titles">
                <div className="col-md-6 col-8 align-self-center">
                    <h3 className="text-themecolor m-b-0 m-t-0">Enroll Course</h3>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={Home}>Home</Link></li>
                        <li className="breadcrumb-item active">Enroll Course</li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div>
                    <section id="course-section">
                        <div className="card">
                            <div className="card-body">
                                <h2>Enrolled Course Section</h2>
                                <p>This is the course section. Scroll down to see more.</p>
                            </div>
                        </div>

                        <div className="row">
                            {enrolledCourses.length > 0 ? (
                                enrolledCourses.map((course) => (
                                    <div className="col-md-4 my-4" key={course.id}>
                                        <div className="p-3 border border-dark bg-white" style={{ borderRadius: '15%' }}>
                                            <img src={FE} className="img-fluid my-3 w-100" alt="Course" />
                                            <h2>{course.course.name}</h2>
                                            <p>{course.course.description}</p>
                                            <div className="text-right col-md-12">
                                                <button
                                                    type="button"
                                                    className="btn btn-dark d-flex align-items-center justify-content-center"
                                                    onClick={() => handleDetailClick(course.course.id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle mr-2" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                    </svg>
                                                    <span>Detail</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No courses enrolled yet.</p>
                            )}
                        </div>

                    </section>
                </div>
            </div>
        </>
    );
};
