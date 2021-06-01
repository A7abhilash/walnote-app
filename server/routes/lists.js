const express = require("express");
const router = express.Router();
var CryptoJS = require("crypto-js");
const Lists = require("../models/Lists");
const auth = require("../middleware/auth");

//@route   GET /lists/:id
//@desc     Get all the LISTS of userId
router.get("/", auth, async (req, res) => {
  try {
    // console.log(req.user);
    const allData = [];
    const allList = await Lists.find({ userId: req.user._id });
    allList.forEach((list) => {
      const decryptedData = CryptoJS.AES.decrypt(list.data, "Secret key 123");
      const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
      data["_id"] = list._id;
      allData.push(data);
    });
    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//@route    POST /lists
//@desc     Add new LIST
router.post("/", auth, async (req, res) => {
  let list = {
    listName: req.body.listName,
    todos: req.body.todos,
    check: req.body.check,
    userId: req.body.userId,
  };
  // console.log(list);
  if (list.userId.toString() !== req.user._id.toString()) {
    return res.status(400).json({ error: "Unauthorized access" });
  }
  try {
    let encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(list),
      "Secret key 123"
    ).toString();
    let data = new Lists({ data: encryptedData, userId: req.body.userId });
    let response = await data.save();
    list["_id"] = response._id;
    res.status(201).json(list);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

//@route    PATCH /lists/:id
//@desc     Edit LIST
router.patch("/:id", auth, async (req, res) => {
  try {
    const list = await Lists.findByIdAndUpdate(req.params.id);
    if (list.userId.toString() !== req.user._id.toString()) {
      return res.status(400).json({ error: "Unauthorized access" });
    }
    const decryptedData = CryptoJS.AES.decrypt(list.data, "Secret key 123");
    const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));

    data.listName = req.body.listName || data.listName;
    data.todos = req.body.todos || data.todos;
    data.check = req.body.check || data.check;
    data._id = req.params.id;
    try {
      let encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        "Secret key 123"
      ).toString();
      list.data = encryptedData;
      await list.save();
      const allData = [];
      const allList = await Lists.find({ userId: data.userId });
      allList.forEach((list) => {
        const decryptedData = CryptoJS.AES.decrypt(list.data, "Secret key 123");
        const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
        data["_id"] = list._id;
        allData.push(data);
      });
      res.status(201).json({ updatedList: data, allList: allData });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

//@route     DELETE /lists/:id
//@desc     Delete a LIST
router.delete("/:id", auth, async (req, res) => {
  try {
    let list = await Lists.findById(req.params.id);
    if (list.userId.toString() !== req.user._id.toString()) {
      return res.status(400).json({ error: "Unauthorized access" });
    }
    await list.deleteOne();
    res.status(201).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
