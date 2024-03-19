const Place = require("../models/Place");

const fetchAllPlaces = async (req, res) => {
  res.json(await Place.find());
};

const fetchSinglePlace = async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
};

module.exports = { fetchAllPlaces, fetchSinglePlace };
