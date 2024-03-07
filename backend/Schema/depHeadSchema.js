const mongoose = require('mongoose');

// Define the schema for the department head
const depHeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  Image: { 
    type: String,
    required: true,
  },
  profileDescription: {
    type: String,
    required: true,
  },
});

// Create the Department Head model using the schema
const DepartmentHead = mongoose.model('DepartmentHead', depHeadSchema);

module.exports = DepartmentHead;
