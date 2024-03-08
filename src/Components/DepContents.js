import React, { useState, useEffect } from 'react';
import './DepContents.css';
import axios from 'axios';

const DepContents = () => {
  const [departmentsData, setDepartmentsData] = useState([]);
  const [depHeadData, setDepHeadData] = useState([]);

  useEffect(() => {

    fetchDepartments();
    fetchDepartmentHeads();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5001/department');
      setDepartmentsData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchDepartmentHeads = async () => {
    try {
      const response = await axios.get('http://localhost:5001/dephead');
      setDepHeadData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='all-contents'>
      <div className="header-department" id='departments'>
        <div className='head'>
          <h1 className="header-title">Departments</h1>
        </div>
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
              <p className='year'>{department.departmentYear}</p>
            </div>
          ))}
        </div>
        <div className="head">
          <h1>Department Head</h1>
          <div className='dephead-card'>
            {depHeadData.map((dephead) => {
              return (

                <div className="department-card-dephead" key={dephead._id}>
                  <h1 className="dephead-name">{dephead.name}</h1>
                  <h2 className="dephead-department-name">{dephead.department.departmentName}</h2>
                  <h3 className="dephead-age">Age: {dephead.age}</h3>
                  <p className="dephead-profile-description">{dephead.profileDescription}</p>
                  <img
                    className="dephead-image"
                    src={`http://localhost:5001/${dephead.Image}`}
                    alt={dephead.name}
                  />

                </div>
              )
            }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepContents;
