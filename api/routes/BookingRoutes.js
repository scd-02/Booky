const express = require("express");
const { booking, fetchBookings } = require("../controllers/BookingController");

const router = express.Router();

router.post("/", booking);
router.get("/", fetchBookings);

module.exports = router;
