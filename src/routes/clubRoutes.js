const express = require("express");

const {
  createClub,
  getClubs,
} = require("../controllers/clubControllers");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createClub);

router.get("/", getClubs);

module.exports = router;