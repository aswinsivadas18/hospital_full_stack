import React, { useState, useEffect } from 'react';
import './Employees.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Employees = () => {
    // State declarations
    const [employeeData, setEmployeeData] = useState([]);
    const [depHeadData, setDepHeadData] = useState([]);
    const [departmentsData, setDepartmentsData] = useState([]);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({
        _id: '',
        name: '',
        Image: '',
        age: 0,
        departmenthead: '',
        department: '',
        employeeId: '',
    });
    const [selectedDepartment, setSelectedDepartment] = useState('');

    // Fetch data on component mount
    useEffect(() => {
        fetchEmployees();
        fetchDepartmentHeads();
        fetchDepartments();
    }, []);

    // Fetch employees data
    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5001/employee');
            setEmployeeData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch department heads data
    const fetchDepartmentHeads = async () => {
        try {
            const response = await axios.get('http://localhost:5001/dephead');
            setDepHeadData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch departments data
    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:5001/department');
            setDepartmentsData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Create Employee Popup functions
    const openCreatePopup = () => {
        setIsCreatePopupOpen(true);
    };

    const closeCreatePopup = () => {
        setIsCreatePopupOpen(false);
    };

    // const openEditPopup = (employee) => {
    //     setIsEditPopupOpen(true);
    //     setEditFormData(employee);
    // };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
        setEditFormData({
            _id: '',
            name: '',
            Image: '',
            age: 0,
            departmenthead: '',
            department: '',
            employeeId: '',
        });
    };

    const handleDepartmentChange = (event) => {
        const selectedDepId = event.target.value;
        setSelectedDepartment(selectedDepId);
    };

    const openEditPopup = (employee) => {
        if (employee) {
            populateEditForm(employee); // Call the function to populate the form
            setIsEditPopupOpen(true);
        } else {
            console.error("Invalid employee data provided for editing.");
        }
    };

    const populateEditForm = (employee) => {
        if (employee && employee.department && employee.departmenthead) {
            setEditFormData({
                _id: employee._id,
                name: employee.name,
                Image: employee.Image,
                age: employee.age,
                departmenthead: employee.departmenthead._id,
                department: employee.department._id,
                employeeId: employee.employeeId, // Initialize the employeeId field
            });
            setSelectedDepartment(employee.department._id);
        } else {
            console.error("Invalid employee data provided for populating edit form.");
        }
    };



    const handleSubmitCreateEmployee = async (event) => {
        event.preventDefault();
        try {
            // Form data
            const formData = new FormData();
            formData.append('name', event.target.elements['create-employee-name'].value);
            formData.append('Image', event.target.elements['create-employee-image'].files[0]);
            formData.append('employeeId', event.target.elements['create-employee-empid'].value);
            formData.append('age', event.target.elements['create-employee-age'].value);
            formData.append('department', event.target.elements['create-employee-department'].value);
            formData.append('departmenthead', event.target.elements['create-employee-dephead'].value);

            // POST request to create employee
            const response = await axios.post('http://localhost:5001/employee', formData);
            setEmployeeData([...employeeData, response.data]);
            closeCreatePopup();
        } catch (error) {
            console.error('Error creating employee:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
            }
        }
    };

    const handleSubmitEditEmployee = async (event) => {
        event.preventDefault();
        try {
            // Form data
            const formData = new FormData();
            formData.append('name', editFormData.name);
            formData.append('Image', editFormData.Image);
            formData.append('employeeId', editFormData.employeeId);
            formData.append('age', editFormData.age);
            formData.append('department', editFormData.department);
            formData.append('departmenthead', editFormData.departmenthead);

            console.log('Form Data before sending PUT request:', formData); // Add this line

            // PUT request to update employee
            const response = await axios.put(`http://localhost:5001/employee/${editFormData._id}`, formData);

            console.log('PUT response:', response.data); // Add this line

            // Update the employeeData state with the edited employee
            setEmployeeData(prevEmployeeData => {
                const updatedData = prevEmployeeData.map(employee =>
                    employee._id === editFormData._id ? response.data : employee
                );
                return updatedData;
            });

            // Close the edit popup
            closeEditPopup();
        } catch (error) {
            console.error('Error updating employee:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
            }
        }
    };

    const handleDeleteEmployee = async (employeeId) => {
        try {
            // DELETE request to remove employee
            await axios.delete(`http://localhost:5001/employee/${employeeId}`);

            // Update employeeData state by filtering out the deleted employee
            setEmployeeData(prevEmployeeData => prevEmployeeData.filter(employee => employee._id !== employeeId));
        } catch (error) {
            console.error('Error deleting employee:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
            }
        }
    };


    return (
        <div className='employee-container'>
            <h1 className="header-title-employee">Employees</h1>
            <div className='employee-create'>
                <button className="employee-create-btn" onClick={() => openCreatePopup()}>
                    <FontAwesomeIcon icon={faPlus} className="button-icon" />
                    Create
                </button></div>
            <div className="employee-cards-container">
                {employeeData.map((employee) => (
                    <div className="employee-card-employee" key={employee._id}>
                        <h1 className="employee-name">{employee.name}</h1>
                        <h2 className="employee-department-name">{employee.department.departmentName}</h2>
                        <h2 className="employee-departmenthead-name">Head :{employee.departmenthead.name}</h2>
                        <h3 className="employee-employee-id">Employee ID :{employee.employeeId}</h3>
                        <h4 className="employee-age">Age :{employee.age}</h4>
                        <img className="employee-image" src={`http://localhost:5001/${employee.Image}`} alt="Department Head" />
                        <div className='employee-buttons'>
                            <button className="edit-employee-button" onClick={() => openEditPopup(employee)}>
                                <FontAwesomeIcon icon={faEdit} className="button-icon" />
                                Edit
                            </button>
                            <button className="delete-employee-button" onClick={() => handleDeleteEmployee(employee._id)}>
                                <FontAwesomeIcon icon={faTrash} className="button-icon" />
                                Delete
                            </button>
                        </div>
                    </div>

                )
                )}
            </div>
            {/* Create Employee Popup */}
            {isCreatePopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Create Employee</h2>
                        <form onSubmit={handleSubmitCreateEmployee}>
                            <div className="form-group">
                                <label htmlFor="create-employee-name">Name:</label>
                                <input type="text" id="create-employee-name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="create-employee-empid">Employee ID:</label>
                                <input type="text" id="create-employee-empid" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="create-employee-age">Age:</label>
                                <input type="number" id="create-employee-age" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="create-employee-department">Department:</label>
                                <select
                                    id="create-employee-department"
                                    value={selectedDepartment}
                                    onChange={handleDepartmentChange}
                                >
                                    <option value="">Select a department</option>
                                    {departmentsData.map((department) => (
                                        <option key={department._id} value={department._id}>
                                            {department.departmentName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="create-employee-dephead">Department Head:</label>
                                <select id="create-employee-dephead">
                                    <option value="">Select a department head</option>
                                    {depHeadData
                                        .filter((depHead) => depHead.department._id === selectedDepartment)
                                        .map((depHead) => (
                                            <option key={depHead._id} value={depHead._id}>
                                                {depHead.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="create-employee-image">Image:</label>
                                <input
                                    type="file"
                                    id="create-employee-image"
                                    accept="image/*"
                                    className="custom-file-input"
                                />
                            </div>
                            <div className="form-buttons">
                                <button type="submit" className="submit-button">Create</button>
                                <button type="button" className="close-button" onClick={closeCreatePopup}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isEditPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Edit Department Head</h2>
                        <form onSubmit={handleSubmitEditEmployee}>
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
                                <label htmlFor="edit-dephead-empid">Employee ID:</label>
                                <input
                                    type="text"
                                    id="edit-dephead-empid"
                                    value={editFormData.employeeId}
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            employeeId: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="edit-dephead-department">Department:</label>
                                <select
                                    id="edit-dephead-department"
                                    value={editFormData.department._id} // Set the selected department
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            department: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Select a department</option>
                                    {departmentsData.map((department) => (
                                        <option key={department._id} value={department._id}>
                                            {department.departmentName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="edit-dephead-departmenthead">Department Head:</label>
                                <select
                                    id="edit-dephead-departmenthead"
                                    value={editFormData.departmenthead._id} // Set the selected department head
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            departmenthead: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Select a department head</option>
                                    {depHeadData
                                        .filter((depHead) => depHead.department._id === selectedDepartment)
                                        .map((depHead) => (
                                            <option key={depHead._id} value={depHead._id}>
                                                {depHead.name}
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
    )
}

export default Employees
