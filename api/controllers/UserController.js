const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bcryptSalt = bcrypt.genSaltSync(10);

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (error) {
    console.log(`registration unsuccessfull ${error}`);
    res.status(422).json(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });

    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);

      if (passOk) {
        jwt.sign(
          {
            email: userDoc.email,
            id: userDoc._id,
          },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.status(422).json("incorrect password");
      }
    } else {
      res.json("user not found");
    }
  } catch (error) {
    console.log(`user not found ${error}`);
    res.status(422).json(error);
  }
};

const userProfile = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
        if (err) throw err;

        const { name, email, _id } = await User.findById(data.id);

        res.json({ name, email, _id });
      });
    } else {
      res.json(null);
    }
  } catch (error) {
    console.log(`user not found ${error}`);
    res.status(422).json(error);
  }
};

const userLogout = async (req, res) => {
  res.cookie('token', '').json(true)
};

module.exports = { registerUser, loginUser, userProfile, userLogout };
