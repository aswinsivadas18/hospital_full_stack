import React, { useState, useEffect } from 'react';
import './Departments.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Departments = () => {
  const [departmentsData, setDepartmentsData] = useState([]);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    _id: '',
    departmentName: '',
    departmentDescription: '',
    departmentImage: '',
    departmentYear: 0,
  });

  const openCreatePopup = () => {
    setIsCreatePopupOpen(true);
  };

  const closeCreatePopup = () => {
    setIsCreatePopupOpen(false);
  };

  const openEditPopup = (department) => {
    setIsEditPopupOpen(true);
    setEditFormData(department);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setEditFormData({
      _id: '',
      departmentName: '',
      departmentDescription: '',
      departmentImage: '',
      departmentYear: 0,
    });
  };

  const handleSubmitCreate = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('departmentName', event.target.elements['create-department-name'].value);
      formData.append('departmentDescription', event.target.elements['create-department-description'].value);
      formData.append('departmentImage', event.target.elements['create-department-image'].files[0]);
      formData.append('departmentYear', parseInt(event.target.elements['create-department-year'].value));

      const response = await axios.post('http://localhost:5001/department', formData);
      setDepartmentsData([...departmentsData, response.data]);
      closeCreatePopup();
    } catch (error) {
      console.error('Error creating department:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
    }
  };


  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('departmentName', editFormData.departmentName);
      formData.append('departmentDescription', editFormData.departmentDescription);

      // Check if the 'edit-department-image' input element is accessible and exists
      const departmentImageInput = event.target.elements['edit-department-image'];
      if (departmentImageInput) {
        formData.append('departmentImage', departmentImageInput.files[0]);
      }

      formData.append('departmentYear', editFormData.departmentYear);

      const response = await axios.put(`http://localhost:5001/department/put/${editFormData._id}`, formData);
      setDepartmentsData(departmentsData.map((department) => (department._id === editFormData._id ? response.data : department)));
      closeEditPopup();
    } catch (error) {
      console.error('Error updating department:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
    }
  };


  const handleDeleteDepartment = async (departmentId) => {
    try {
      await axios.delete(`http://localhost:5001/department/delete/${departmentId}`);
      setDepartmentsData(departmentsData.filter((department) => department._id !== departmentId));
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:5001/department');
        setDepartmentsData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <div className="header-department">
      <div className='create-btn'>
        <button className="department-btn" onClick={openCreatePopup}>
          <FontAwesomeIcon icon={faPlus} className="button-icon" />
          Create
        </button></div>
      <div className='head'><h1 className="header-title">Departments</h1></div>
      <div className='card'>
        {departmentsData.map((department) => (
          <div key={department._id} className="department-card">
            <h2 className="department-name">{department.departmentName}</h2>
            <img
              className="department-image"
              src={`http://localhost:5001/${department.departmentImage}`}
              alt={department.departmentName}
            />
            <p className='description'>{department.departmentDescription}</p>
            <p className='year'>Year :{department.departmentYear}</p>
            <div className="department-buttons">
              <button className="department-button" onClick={() => openEditPopup(department)}>
                <FontAwesomeIcon icon={faEdit} className="button-icon" />
                Edit
              </button>
              <button className="department-button" onClick={() => handleDeleteDepartment(department._id)}>
                <FontAwesomeIcon icon={faTrash} className="button-icon" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Department Popup */}
      {isCreatePopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Create Department</h2>
            <form onSubmit={handleSubmitCreate}>
              <div className="form-group">
                <label htmlFor="create-department-name">Department Name:</label>
                <input type="text" id="create-department-name" />
              </div>
              <div className="form-group">
                <label htmlFor="create-department-description">Department Description:</label>
                <textarea id="create-department-description" rows="3"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="create-department-image">Department Image:</label>
                <input
                  type="file"
                  id="create-department-image"
                  accept="image/*"
                  className="custom-file-input"
                  onChange={(e) => {
                    setEditFormData({ ...editFormData, departmentImage: e.target.files[0] });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="create-department-year">Department Year:</label>
                <input type="number" id="create-department-year" />
              </div>
              <div className="form-buttons">
                <button type="submit" className="submit-button">Create</button>
                <button type="button" className="close-button" onClick={closeCreatePopup}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Department Popup */}
      {isEditPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Department</h2>
            <form onSubmit={handleSubmitEdit}>
              <div className="form-group">
                <label htmlFor="edit-department-name">Department Name:</label>
                <input
                  type="text"
                  id="edit-department-name"
                  value={editFormData.departmentName}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      departmentName: e.target.value, // Update the departmentName property
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-department-description">Department Description:</label>
                <textarea
                  id="edit-department-description"
                  rows="3"
                  value={editFormData.departmentDescription}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      departmentDescription: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="create-department-image">Department Image:</label>
                <input
                  type="file"
                  id="edit-department-image"
                  accept="image/*"
                  className="custom-file-input"
                  onChange={(e) => {
                    setEditFormData({
                      ...editFormData,
                      departmentImage: e.target.files[0], // Update only the departmentImage property
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-department-year">Department Year:</label>
                <input
                  type="number"
                  id="edit-department-year"
                  value={editFormData.departmentYear}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      departmentYear: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="form-buttons">
                <button type="submit" className="submit-button">Update</button>
                <button type="button" className="close-button" onClick={closeEditPopup}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
