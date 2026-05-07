const express = require("express");

const {
  createOpportunity,
  getOpportunities,
} = require("../controllers/opportunityControllers");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOpportunity);

router.get("/", getOpportunities);

module.exports = router;