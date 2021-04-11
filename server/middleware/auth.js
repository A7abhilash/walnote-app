const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in!!!" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized Access" });
    }
    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };
    next();
  });
};
