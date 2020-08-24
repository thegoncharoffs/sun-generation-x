const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    title: {
      en: String,
      ru: String,
    },
    text: {
      en: String,
      ru: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("News", NewsSchema);
