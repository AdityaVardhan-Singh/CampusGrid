const express = require("express");

const {
  applyToOpportunity,
  getMyApplications,
} = require("../controllers/applicationControllers");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, applyToOpportunity);

router.get("/my", protect, getMyApplications);

module.exports = router;