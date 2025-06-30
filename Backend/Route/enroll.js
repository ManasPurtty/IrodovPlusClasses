const express = require("express");
const router = express.Router();
const multer = require("multer");
const Enroll = require("../Models/Enroll");

// Use memory storage to store file in buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create enrollment with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, fatherName, school, address, number, mark } = req.body;

    const newEntry = new Enroll({
      name,
      fatherName,
      school,
      address,
      number,
      mark,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    });

    await newEntry.save();
    res.status(200).json({ message: "Enrollment successful" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch all enrollments (with image as base64 string)
router.get("/", async (req, res) => {
  try {
    const enrollments = await Enroll.find();

    // Convert image buffer to base64 string
    const result = enrollments.map((e) => ({
      _id: e._id,
      name: e.name,
      fatherName: e.fatherName,
      school: e.school,
      address: e.address,
      number: e.number,
      mark: e.mark,
      image: `data:${e.image.contentType};base64,${e.image.data.toString('base64')}`,
      createdAt: e.createdAt
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrollments" });
  }
});

module.exports = router;
