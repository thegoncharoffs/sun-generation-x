const express = require("express");
const { readNewsConfig, updateNewsConfig } = require("../utils/newsConfig");

const router = express.Router();

function getNews(req, res) {
  res.status(200).send(readNewsConfig());
}

function updateNews(req, res) {
  const newsConfig = readNewsConfig();

  if (!newsConfig) {
    newsConfig = [];
  }

  newsConfig.push(req.body);
  updateNewsConfig(newsConfig);

  res.status(200).send("News updated successfully");
}

function deleteNews(req, res) {
  const newsConfig = readNewsConfig();

  if (!newsConfig) {
    res.status(500).send("No news on the server");
  }

  newsConfig = newsConfig.filter((news) => news.date !== req.body.date);
  updateNewsConfig(newsConfig);

  res.status(200).send("News deleted successfully");
}

router
  .get("/news", getNews)
  .post("/news", verifyToken, updateNews)
  .delete("/news", verifyToken, deleteNews);

module.exports = router;
