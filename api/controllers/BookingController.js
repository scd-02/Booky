const verification = require("../config/verify");
const Booking = require("../models/Booking");

const booking = async (req, res) => {
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;

  const userDoc = await verification(req);
  try {
    const bookingDoc = await Booking.create({
      place,
      user: userDoc.id,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
    });

    res.json(bookingDoc);
  } catch (error) {
    console.log(`Booking unsuccessfull ${error}`);
    res.status(422).json(error);
  }
};

const fetchBookings = async (req, res) => {
  const userDoc = await verification(req);

  res.json(await Booking.find({ user: userDoc.id }).populate("place"));
};

module.exports = { booking, fetchBookings };
