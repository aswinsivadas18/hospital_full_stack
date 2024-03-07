const express = require('express');
const router = express.Router();
const DepartmentHead = require('../Schema/depHeadSchema');
const Employee = require('../Schema/employeeSchema'); // Changed from "Employees"
const Department = require('../Schema/departmentSchema');
const multer = require('multer');
const path = require('path');

// Create storage for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Generate a unique filename for the uploaded file
    },
});

const upload = multer({ storage }); // Initialize Multer with the storage configuration

// Route to handle POST request to create a new employee
router.post('/employee', upload.single('Image'), async (req, res) => {
    try {
        console.log('Received employee creation request');

        // Extract data from the request body
        const { name, employeeId, age, departmenthead, department } = req.body;
        const Image = req.file ? req.file.path : '';

        // Validate required fields
        if (!name || !employeeId || !age || !departmenthead || !department ) {
            return res.status(400).json({ error: 'Please provide all the required fields.' });
        }

        const departmentheadExists = await DepartmentHead.exists({ _id: departmenthead, department: department });
        if (!departmentheadExists) {
            return res.status(404).json({ status: 'error', error: 'Department head not found for the specified department' });
        }

        const departmentexist = await Department.exists({ _id: department });
        if (!departmentexist) {
            return res.status(404).json({ status: 'error', error: 'Department not found' });
        }

        const existingEmployeeId = await Employee.findOne({ employeeId });
        if (existingEmployeeId) {
            return res.status(409).json({ error: 'Employee with the same employee ID already exists.' });
        }

        const newEmployee = new Employee({
            name,
            employeeId,
            age,
            departmenthead,
            department,
            Image,
        });

        await newEmployee.save();

        res.status(201).json(newEmployee);
    } catch (err) {
        console.error('Error creating employee:', err);
        res.status(500).json({ error: 'An error occurred while creating the employee.' });
    }
});


// Route to retrieve all employees
router.get('/employee', async (req, res) => {
    try {
        const employees = await Employee.find().populate('departmenthead department'); // Populate the departmenthead reference

        res.status(200).json(employees);
    } catch (err) {
        console.error('Error retrieving employees:', err);
        res.status(500).json({ error: 'An error occurred while retrieving employees.' });
    }
});

// Route to update an employee
router.put('/employee/:id', upload.single('Image'), async (req, res) => {
    try {
        console.log('Received employee update request');

        const employeeId = req.params.id;
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found.' });
        }

        const { name, age, departmenthead, department} = req.body;

        const departmentheadExists = await DepartmentHead.exists({ _id: departmenthead, department: department });
        if (!departmentheadExists) {
            return res.status(404).json({ status: 'error', error: 'Department head not found for the specified department' });
        }

        const departmentExists = await Department.exists({ _id: department });
        if (!departmentExists) {
            return res.status(404).json({ status: 'error', error: 'Department not found' });
        }

        employee.name = name;
        employee.age = age;
        employee.departmenthead = departmenthead;
        employee.department = department;

        if (req.file) {
            employee.Image = req.file.path;
        }

        await employee.save();

        res.status(200).json(employee);
    } catch (err) {
        console.error('Error updating employee:', err);
        res.status(500).json({ error: 'An error occurred while updating the employee.' });
    }
});

// Route to delete an employee
router.delete('/employee/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Employee not found.' });
        }

        res.status(200).json({ message: 'Employee deleted successfully.', deletedEmployee });
    } catch (err) {
        console.error('Error deleting employee:', err);
        res.status(500).json({ error: 'An error occurred while deleting the employee.' });
    }
});

module.exports = router;

