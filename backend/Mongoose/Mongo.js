// Mongoose/mongoose.js
const mongoose = require('mongoose');

const uri = 'mongodb+srv://aswinsivadas27:tvdELDHiEANCGaVa@cluster0.phuhjiw.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB.');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

module.exports = mongoose;

// mongodb+srv://aswinsivadas27:tvdELDHiEANCGaVa@cluster0.phuhjiw.mongodb.net/?retryWrites=true&w=majority

//QWPqXaWgX0KjUEou

//mongodb+srv://aswinsivadas27:QWPqXaWgX0KjUEou@cluster0.famrbhy.mongodb.net/?retryWrites=true&w=majority