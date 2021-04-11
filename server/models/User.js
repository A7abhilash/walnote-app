const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (error, hashedPw) => {
      if (error) return next(error);

      user.password = hashedPw;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (userPw) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(userPw, user.password, (err, isMatched) => {
      if (err) return reject(err);

      if (!isMatched) return reject(err);

      return resolve(true);
    });
  });
};

module.exports = mongoose.model("User", UserSchema);
