const express = require("express");
const Task = require("./model");
const router = express.Router();

router.get("/", (req, res, next) => {
  Task.find()
    .then((task) => {
      res.status(200).json(task);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Task.insert(req.body)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch(next);
});

module.exports = router;