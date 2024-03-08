const express = require('express');
const router = express.Router();
const DepartmentHead = require('../Schema/depHeadSchema');
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

// Route to handle POST request to create a new department head
router.post('/dephead', upload.single('Image'), async (req, res) => {
  try {
    console.log('Received department head creation request');

    // Extract data from the request body
    const { name, employeeId, age, department, profileDescription } = req.body;
    const Image = req.file ? req.file.path : ''; // Store the image path

    // Validate required fields
    if (!name || !employeeId || !age || !department || !profileDescription) {
      return res.status(400).json({ error: 'Please provide all the required fields.' });
    }

    const existingEmployeeId = await DepartmentHead.findOne({ employeeId });
    if (existingEmployeeId) {
      return res.status(409).json({ error: 'Department head with the same employee ID already exists.' });
    }

    const departments = await Department.exists({ _id: department });
    if (!departments) {
      return res.status(404).json({ status: 'error', error: 'Department not found' });
    }

    // Create a new department head instance using the DepartmentHead model
    const newDepHead = new DepartmentHead({
      name,
      employeeId,
      age,
      department,
      Image,
      profileDescription,
    });

    // Save the new department head to the database
    await newDepHead.save();

    // Respond with the newly created department head
    res.status(201).json(newDepHead);
  } catch (err) {
    console.error('Error creating department head:', err);
    res.status(500).json({ error: 'An error occurred while creating the department head.' });
  }
});

router.get('/dephead', async (req, res) => {
  try {
    // Find all department heads in the database
    const departmentHeads = await DepartmentHead.find().populate('department');

    // Respond with the array of department head details
    res.status(200).json(departmentHeads);
  } catch (err) {
    console.error('Error retrieving department heads:', err);
    res.status(500).json({ error: 'An error occurred while retrieving department heads.' });
  }
});

router.put('/dephead/:id', upload.single('Image'), async (req, res) => {
  try {
    console.log('Received department head update request');

    // Extract department head ID from the request parameters
    const depHeadId = req.params.id;

    // Find the existing department head by ID
    const depHead = await DepartmentHead.findById(depHeadId);

    if (!depHead) {
      return res.status(404).json({ error: 'Department head not found.' });
    }

    // Extract updated data from the request body
    const { name, employeeId, age, department, profileDescription } = req.body;
    
    // Check if the provided department ID exists
    const departments = await Department.exists({ _id: department });
    if (!departments) {
      return res.status(404).json({ status: 'error', error: 'Department not found' });
    }

    // Update the department head details
    depHead.name = name;
    depHead.employeeId = employeeId;
    depHead.age = age;
    depHead.department = department;
    depHead.profileDescription = profileDescription;

    // Check if a new Image file was provided
    if (req.file) {
      depHead.Image = req.file.path; // Store the image path
    }

    // Save the updated department head to the database
    await depHead.save();

    // Respond with the updated department head
    res.status(200).json(depHead);
  } catch (err) {
    console.error('Error updating department head:', err);
    res.status(500).json({ error: 'An error occurred while updating the department head.' });
  }
});

router.delete('/dephead/:id', async (req, res) => {
  try {
    const depHeadId = req.params.id;

    // Find the department head by ID in the database and delete it
    const deletedDepHead = await DepartmentHead.findByIdAndDelete(depHeadId);

    if (!deletedDepHead) {
      return res.status(404).json({ error: 'Department head not found.' });
    }

    // Respond with the deleted department head details
    res.status(200).json({ message: 'Department head deleted successfully.', deletedDepHead });
  } catch (err) {
    console.error('Error deleting department head:', err);
    res.status(500).json({ error: 'An error occurred while deleting the department head.' });
  }
});

// Implement GET, DELETE, PUT, and other routes for department heads similar to the departmentRouter.js file

module.exports = router;
