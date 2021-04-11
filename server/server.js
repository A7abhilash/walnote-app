const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const auth = require("./middleware/auth");

const app = express();

//****CONFIGURATION
//dotenv
dotenv.config({ path: "./config/config.env" });
//database
connectDB();

//****MIDDLEWARES
//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//****ROUTES
//GET /
app.get("/", auth, (req, res) => {
  let user = req.user;
  if (user) {
    return res.json({ user });
  }
  return res.json(null);
});
app.use("/auth", require("./routes/auth"));

//****PORT
const PORT = process.env.PORT || 7781;
app.listen(PORT, () => console.log(`Server connected on port:${PORT}`));
