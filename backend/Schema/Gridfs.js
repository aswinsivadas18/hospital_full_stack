// Mongoose/gridfs.js
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;

const initGridFS = () => {
  const conn = mongoose.connection;
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
};

const getGridFS = () => {
  return gfs;
};

module.exports = { initGridFS, getGridFS };
