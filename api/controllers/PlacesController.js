const imageDownloader = require("image-downloader");
const path = require("path");
const fs = require("fs");
const Place = require("../models/Place");
const jwt = require("jsonwebtoken");

const allPlaces = async (req, res) => {
  const { token } = req.cookies;

  try {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;

      const { id } = userData;
      const placesList = await Place.find({ owner: id });

      res.json(placesList);
    });
  } catch (error) {
    res.json(error);
  }
};

const singlePlace = async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
};

const updatePlace = async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;

    const placeDoc = await Place.findById(id);

    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        price: price,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
};

const uploadByLink = async (req, res) => {
  const dirname = path.resolve(path.relative(__dirname, "api/uploads"));

  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: dirname + "/" + newName,
  });

  res.json(newName);
};

const uploadFromDevice = (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, filename, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    const newFilename = filename + "." + ext;
    uploadedFiles.push(newFilename);

    fs.renameSync(path, newPath);
  }

  res.json(uploadedFiles);
};

const addNewPlace = async (req, res) => {
  try {
    const { token } = req.cookies;
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    } = req.body;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
      if (err) throw err;

      const placeDoc = await Place.create({
        owner: data.id,
        title: title,
        price: price,
        address: address,
        photos: addedPhotos,
        description: description,
        perks: perks,
        extraInfo: extraInfo,
        checkIn: checkIn,
        checkOut: checkOut,
        maxGuests: maxGuests,
      });

      res.json(placeDoc);
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  uploadByLink,
  uploadFromDevice,
  addNewPlace,
  allPlaces,
  singlePlace,
  updatePlace,
};
