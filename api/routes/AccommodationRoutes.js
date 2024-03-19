const express = require("express");
const path = require("path");
const {
  uploadByLink,
  uploadFromDevice,
  addNewPlace,
  allPlaces,
  singlePlace,
  updatePlace,
} = require("../controllers/PlacesController");
const multer = require("multer");
const router = express.Router();

router.get("/", allPlaces);
router.put("/", updatePlace);
router.get("/:id", singlePlace);
router.post("/upload-by-link", uploadByLink);

let upload;
try {
  const dirname = path.resolve(path.relative(__dirname, "api/uploads"));
  upload = multer({ dest: dirname + "/" });
} catch (error) {
  throw error;
}
router.post(
  "/upload-from-device",
  upload.array("photos", 100),
  uploadFromDevice
);

router.post("/add-new-place", addNewPlace);

module.exports = router;
