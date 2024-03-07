const express = require('express');
const router = express.Router();

// Include other router files if you have them
// const otherRouter = require('./path/to/otherRouter');

// Include the departmentRouter
const departmentRouter = require('./departmentRoute');
const depHeadRouter = require('./depHeadRoute');
const employeeRouter = require('./employeesRoute');
// Use the departmentRouter for handling department-related routes
router.use(departmentRouter);
router.use(depHeadRouter);
router.use(employeeRouter);

// Use other routers if you have them
// router.use(otherRouter);

module.exports = router;
