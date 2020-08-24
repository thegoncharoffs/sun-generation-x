const express = require("express");

const verifyToken = require("../middlewares/verifyToken");
const News = require("../models/News");

const router = express.Router();

const getNews = async (req, res) => {
  res.status(200).send((await News.find({})).reverse());
};

const addNews = async (req, res) => {
  const news = await News.create(req.body);

  if (!news) {
    res.status(500).send({ message: "Can't update news" });
  }

  res.status(200).send((await News.find({})).reverse());
};

const deleteNews = async (req, res) => {
  const news = await News.findById(req.query.id);

  if (!news) {
    res.status(500).send({ message: "News with this id is not found" });
  }

  news.remove();

  res.status(200).send((await News.find({})).reverse());
};

router
  .get("", getNews)
  .post("", verifyToken, addNews)
  .delete("", verifyToken, deleteNews);

module.exports = router;
