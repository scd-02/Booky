const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const placesRoutes = require("./routes/AccommodationRoutes");
const indexPlacesRoutes = require("./routes/IndexPlacesRoutes");
const bookingRoutes = require("./routes/BookingRoutes");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
connectDB();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/test", (req, res) => {
  res.json("test ok");
});

// api
app.use("/api/user", userRoutes);
app.use("/api/places", placesRoutes);
app.use("/api/index/places", indexPlacesRoutes);
app.use("/api/bookings", bookingRoutes);

// server setup
const PORT = process.env.PORT || 4153;
const server = app.listen(PORT, () => {
  console.log("connected on port 4153");
});
