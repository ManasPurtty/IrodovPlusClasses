const mongoose = require("mongoose");

const EnrollSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  school: String,
  address: String,
  number: String,
  mark: String,
  image: {
    data: Buffer,
    contentType: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Enroll", EnrollSchema);
