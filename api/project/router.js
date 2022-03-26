const express = require("express");
const Project = require("./model");
const router = express.Router();

router.get("/", (req, res, next) => {
  Project.find()
    .then((proj) => {
      res.status(200).json(proj);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Project.insert(req.body)
    .then((proj) => {
      res.status(201).json(proj);
    })
    .catch(next);
});

module.exports = router;