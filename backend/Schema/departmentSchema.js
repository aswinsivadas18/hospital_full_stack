const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
    unique: true,
  },
  departmentDescription: {
    type: String,
    required: true,
  },
  departmentYear: {
    type: Number,
    required: true,
  },
  departmentImage: { 
    type: String,
    required: true,
  },
});


const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
