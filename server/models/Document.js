const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    title: {
      en: String,
      ru: String,
    },
    files: [
      {
        name: {
          type: String,
          required: [true, "Please add a file name"],
        },
        id: {
          type: String,
          required: [true, "Please add a file id"],
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Document", DocumentSchema);
