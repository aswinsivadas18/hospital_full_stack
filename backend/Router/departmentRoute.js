const express = require('express');
const router = express.Router();
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

// Route to handle POST request to create a new department
router.post('/department', upload.single('departmentImage'), async (req, res) => {
  try {
    console.log('Received department creation request');

    // Extract data from the request body
    const { departmentName, departmentDescription, departmentYear } = req.body;
    const departmentImage = req.file ? req.file.path : ''; // Store the image path

    // Validate required fields
    if (!departmentName || !departmentDescription || !departmentYear) {
      return res.status(400).json({ error: 'Please provide all the required fields.' });
    }

    // Check if department with the same name already exists
    const existingDepartmentByName = await Department.findOne({ departmentName });
    if (existingDepartmentByName) {
      return res.status(409).json({ error: 'Department with the same name already exists.' });
    }

    // Check if department with the same description already exists
    const existingDepartmentByDescription = await Department.findOne({ departmentDescription });
    if (existingDepartmentByDescription) {
      return res.status(409).json({ error: 'Department with the same description already exists.' });
    }

    // Create a new department instance using the Department model
    const newDepartment = new Department({
      departmentName,
      departmentDescription,
      departmentYear,
      departmentImage,
    });

    // Save the new department to the database
    await newDepartment.save();

    // Respond with the newly created department
    res.status(201).json(newDepartment);
  } catch (err) {
    console.error('Error creating department:', err);
    res.status(500).json({ error: 'An error occurred while creating the department.' });
  }
});


router.get('/department', async (req, res) => {
  try {
    // Find all departments in the database
    const departments = await Department.find();

    // Respond with the array of department details
    res.status(200).json(departments);
  } catch (err) {
    console.error('Error retrieving departments:', err);
    res.status(500).json({ error: 'An error occurred while retrieving departments.' });
  }
});


router.delete('/department/delete/:id', async (req, res) => {
  try {
    const departmentId = req.params.id;
    
    // Find the department by ID in the database and delete it
    const deletedDepartment = await Department.findByIdAndDelete(departmentId);
    
    if (!deletedDepartment) {
      return res.status(404).json({ error: 'Department not found.' });
    }
    
    // Respond with the deleted department details
    res.status(200).json({ message: 'Department deleted successfully.', deletedDepartment });
  } catch (err) {
    console.error('Error deleting department:', err);
    res.status(500).json({ error: 'An error occurred while deleting the department.' });
  }
});

// Route to update a department by ID
router.put('/department/put/:id', upload.single('departmentImage'), async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ error: 'Department not found.' });
    }

    const { departmentName, departmentDescription, departmentYear } = req.body;

    // Update the department details
    department.departmentName = departmentName;
    department.departmentDescription = departmentDescription;
    department.departmentYear = departmentYear;

    // Check if a new departmentImage file was provided
    if (req.file) {
      department.departmentImage = req.file.path; // Store the image path
    }

    // Save the updated department to the database
    await department.save();

    // Respond with the updated department
    res.status(200).json(department);
  } catch (err) {
    // Handle any error that occurred during the update process
    console.error('Error updating department:', err);

    // Respond with a detailed error message
    res.status(500).json({ error: 'An error occurred while updating the department.', errorMessage: err.message });
  }
});



// Route to get the image by department ID
router.get('/department/image/:id', async (req, res) => {
  try {
    console.log('Department ID:', req.params.id);

    // Find the department by ID in the database
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found.' });
    }

    // Convert the image to base64 string
    const imageBase64 = department.departmentImage; // Assuming departmentImage is already base64 encoded

    // Set the response headers
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', 'inline');

    // Send the image as base64 string in the response
    res.send(imageBase64);
  } catch (err) {
    console.error('Error retrieving department image:', err);
    res.status(500).json({ error: 'An error occurred while retrieving the department image.' });
  }
});




module.exports = router;


