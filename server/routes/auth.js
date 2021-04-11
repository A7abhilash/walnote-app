const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password } = req.body;

    //Check if any other user exists with same email
    let users = await User.findOne({ email });
    if (users) {
      return res.json({ error: "Email already exists." });
    }
    //Check if any other user exists with same username
    users = await User.findOne({ name });
    if (users) {
      return res.json({ error: "Username already exists." });
    }

    const user = await User.create({ name, email, password });
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_KEY
    );
    res.json({ msg: "Success", token });
  } catch (error) {
    res.json({ error: "Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ error: "No blank feilds allowed!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "Invalid email or password!" });
    }
    try {
      await user.comparePassword(password);
      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_KEY
      );
      res.json({ msg: "Success", token });
    } catch (error) {
      return res.json({ error: "Invalid email or password!" });
    }
  } catch (error) {
    return res.json({ error: "Server Error" });
  }
});

module.exports = router;
