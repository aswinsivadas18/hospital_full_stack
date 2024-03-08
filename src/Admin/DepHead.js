import React, { useState, useEffect } from 'react';
import './DepHead.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const DepHead = () => {
    const [depHeadData, setDepHeadData] = useState([]);
    const [departmentsData, setDepartmentsData] = useState([]);
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({
        _id: '',
        name: '',
        profileDescription: '',
        Image: null,
        age: 0,
        department: '',
        employeeId: '',
    });

    useEffect(() => {
        fetchDepartmentHeads();
        fetchDepartments();
    }, []);

    const fetchDepartmentHeads = async () => {
        try {
            const response = await axios.get('http://localhost:5001/dephead');
            setDepHeadData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:5001/department');
            setDepartmentsData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    const openCreatePopup = () => {
        setIsCreatePopupOpen(true);
    };

    const closeCreatePopup = () => {
        setIsCreatePopupOpen(false);
    };

    const openEditPopup = (dephead) => {
        setIsEditPopupOpen(true);
        setEditFormData(dephead);
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
        setEditFormData({
            _id: '',
            name: '',
            profileDescription: '',
            Image: '',
            age: 0,
            department: '',
            employeeId: '',
        });
    };

    const handleSubmitCreate = async (event) => {
        event.preventDefault();
        try {
            // Form data
            const formData = new FormData();
            formData.append('name', event.target.elements['create-dephead-name'].value);
            formData.append('profileDescription', event.target.elements['create-dephead-description'].value);
            formData.append('Image', event.target.elements['create-dephead-image'].files[0]);
            formData.append('employeeId', event.target.elements['create-dephead-empid'].value);
            formData.append('age', event.target.elements['create-dephead-age'].value);
            formData.append('department', event.target.elements['create-dephead-dep'].value);

            // POST request to create department head
            const response = await axios.post('http://localhost:5001/dephead', formData);
            setDepHeadData([...depHeadData, response.data]);
            closeCreatePopup();
        } catch (error) {
            console.error('Error creating department head:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
            }
        }
    };

    const handleSubmitEdit = async (event) => {
        event.preventDefault();
        try {
            // Form data
            const formData = new FormData();
            formData.append('name', editFormData.name);
            formData.append('profileDescription', editFormData.profileDescription);
            formData.append('employeeId', editFormData.employeeId);
            formData.append('age', editFormData.age);
            formData.append('department', editFormData.department);
            if (editFormData.Image) {
                formData.append('Image', editFormData.Image);
            }

            // PUT request to update the department head
            const response = await axios.put(`http://localhost:5001/dephead/${editFormData._id}`, formData);
            setDepHeadData((prevData) =>
                prevData.map((dephead) => (dephead._id === editFormData._id ? response.data : dephead))
            );
            closeEditPopup();
        } catch (error) {
            console.error('Error updating department head:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
            }
        }
    };

    const handleDelete = async (depheadId) => {
        try {
            // DELETE request to delete the department head
            await axios.delete(`http://localhost:5001/dephead/${depheadId}`);
            setDepHeadData((prevData) =>
                prevData.filter((dephead) => dephead._id !== depheadId)
            );
        } catch (error) {
            console.error('Error deleting department head:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
            }
        }
    };

    return (
        <div className="department-head-list">
            <div className="head"> <h1>Department Head</h1></div>
               <div className='dephead-create'>
                <button className="dephead-create-btn" onClick={() => openCreatePopup()}>
                    <FontAwesomeIcon icon={faPlus} className="button-icon" />
                    Create
                </button></div>
            <div className='dephead-card'>
                {depHeadData.map((dephead) => {
                    return (

                        <div className="department-card-dephead" key={dephead._id}>
                            <h1 className="dephead-name">{dephead.name}</h1>
                            <h2 className="dephead-department-name">{dephead.department.departmentName}</h2>
                            <h3 className="dephead-employee-id">Employee ID: {dephead.employeeId}</h3>
                            <h3 className="dephead-age">Age: {dephead.age}</h3>
                            <p className="dephead-profile-description">{dephead.profileDescription}</p>
                            <img
                                className="dephead-image"
                                src={`http://localhost:5001/${dephead.Image}`}
                                alt={dephead.name}
                            />
                            <div className='dephead-buttons'>
                                <button className="edit-dephead-button" onClick={() => openEditPopup(dephead)}>
                                    <FontAwesomeIcon icon={faEdit} className="button-icon" />
                                    Edit
                                </button>
                                <button className="edit-dephead-button" onClick={() => handleDelete(dephead._id)}>
                                    <FontAwesomeIcon icon={faTrash} className="button-icon" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
                }
                )}
            </div>

            {/* Create Department Head Popup */}
            {isCreatePopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Create Department Head</h2>
                        <form onSubmit={handleSubmitCreate}>
                            <div className="form-group">
                                <label htmlFor="create-dephead-name">Name:</label>
                                <input type="text" id="create-dephead-name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="create-dephead-description">Profile Description:</label>
                                <textarea id="create-dephead-description" rows="3"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="create-dephead-image">Image:</label>
                                <input
                                    type="file"
                                    id="create-dephead-image"
                                    accept="image/*"
                                    className="custom-file-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="create-dephead-empid">Employee ID:</label>
                                <input type="text" id="create-dephead-empid" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="create-dephead-age">Age:</label>
                                <input type="number" id="create-dephead-age" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="create-dephead-dep">Department:</label>
                                <select id="create-dephead-dep" value={editFormData.department} onChange={(e) =>
                                    setEditFormData({
                                        ...editFormData,
                                        department: e.target.value,
                                    })
                                }>
                                    <option value="">Select a department</option>
                                    {departmentsData.map((department) => (
                                        <option key={department._id} value={department._id.toString()}>
                                            {department.departmentName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-buttons">
                                <button type="submit" className="submit-button">Create</button>
                                <button type="button" className="close-button" onClick={closeCreatePopup}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Department Head Popup */}
            {isEditPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Edit Department Head</h2>
                        <form onSubmit={handleSubmitEdit}>
                            <div className="form-group">
                                <label htmlFor="edit-dephead-name">Name:</label>
                                <input
                                    type="text"
                                    id="edit-dephead-name"
                                    value={editFormData.name}
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="edit-dephead-description">Profile Description:</label>
                                <textarea
                                    id="edit-dephead-description"
                                    rows="3"
                                    value={editFormData.profileDescription}
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            profileDescription: e.target.value,
                                        })
                                    }
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="edit-dephead-image">Image:</label>
                                <input
                                    type="file"
                                    id="edit-dephead-image"
                                    accept="image/*"
                                    className="custom-file-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="edit-dephead-empid">Employee ID:</label>
                                <input
                                    type="text"
                                    id="edit-dephead-empid"
                                    value={editFormData.employeeId}
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            employeeId: parseInt(e.target.value),
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="edit-dephead-age">Age:</label>
                                <input
                                    type="number"
                                    id="edit-dephead-age"
                                    value={editFormData.age}
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            age: parseInt(e.target.value),
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="edit-dephead-dep">Department:</label>
                                <select
                                    id="edit-dephead-dep"
                                    value={editFormData.department}
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            department: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Select a department</option>
                                    {departmentsData.map((department) => (
                                        <option key={department._id} value={department._id.toString()}>
                                            {department.departmentName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-buttons">
                                <button type="submit" className="submit-button">
                                    Update
                                </button>
                                <button
                                    type="button"
                                    className="close-button"
                                    onClick={closeEditPopup}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DepHead;
