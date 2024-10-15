import Layout from "../../Layout";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../../templates/dashboard";

export const DetaiLMaterials = () => {
    const Home = '/dashboard/mentee';
    const { materialId } = useParams();
    const [material, setMaterial] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (materialId) {
            axios.get(`http://localhost:8080/api/course/material/${materialId}`)
                .then((response) => {
                    if (response.data.message === "Success getting material") {
                        setMaterial(response.data.data);
                    } else {
                        setError(response.data.message);
                    }
                })
                .catch((error) => {
                    setError('Failed to fetch material details');
                    console.error(error);
                });
        }
    }, [materialId]);

    return (
        <>
    
            <div className="page-wrapper">
                <div className="container-fluid">
                    <div className="row page-titles">
                        <div className="col-md-6 col-8 align-self-center">
                            <h3 className="text-themecolor m-b-0 m-t-0">Details Materials</h3>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={Home}>Home</Link></li>
                                <li className="breadcrumb-item active">Details</li>
                            </ol>
                        </div>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Content Material</h4>
                                    {material ? (
                                        <div>
                                            <h6 className="card-subtitle">{material.content}</h6>
                                            {/* Additional details of the material can be displayed here */}
                                        </div>
                                    ) : (
                                        <p>Loading material details...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* List of Assignments Section */}
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">List Of Assignment</h4>
                                    <div className="table-responsive">
                                        <table className="table m-t-30 table-hover contact-list" data-page-size="10">
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Answer</th>
                                                    <th>Score</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                             
                                                <tr>
                                                    <td>1</td>
                                                    <td>
                                                        <a href="#"><img src="../assets/images/users/4.jpg" alt="user" width="40" className="img-circle" /> Sample Answer</a>
                                                    </td>
                                                    <td>100</td>
                                                    <td>
                                                        <button type="button" className="btn btn-sm btn-icon btn-pure btn-outline delete-row-btn" data-toggle="tooltip" data-original-title="Delete">
                                                            <i className="ti-close" aria-hidden="true"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colspan="2">
                                                    <button type="button" class="btn btn-info btn-rounded" data-toggle="modal" data-target="#add-contact">Add New Assignment</button>
                                                </td>
                                                <div id="add-contact" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                                                <h4 class="modal-title" id="myModalLabel">Add New Assignment</h4> </div>
                                                            <div class="modal-body">
                                                                <from class="form-horizontal form-material">
                                                                    <div class="form-group">
                                                                        <div class="col-md-12 m-b-20">
                                                                            <input type="text" class="form-control" placeholder="Jawaban" /> </div>
                                                                        <div class="col-md-12 m-b-20">
                                                                            <div class="fileupload btn btn-danger btn-rounded waves-effect waves-light"><span><i class="ion-upload m-r-5"></i>Upload Assignment</span>
                                                                                <input type="file" class="upload" /> </div>
                                                                        </div>
                                                                    </div>
                                                                </from>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-info waves-effect" data-dismiss="modal">Save</button>
                                                                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Cancel</button>
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                    
                                                </div>
                                                <td colspan="7">
                                                    <div class="text-right">
                                                        <ul class="pagination"> </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                  
                </div>
            </div>
        </>
    );
}
