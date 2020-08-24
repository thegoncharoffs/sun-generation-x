const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const path = require("path");

// Load env variables
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// Load models
const News = require("./models/News");
const Document = require("./models/Document");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Read JSON files
const news = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/news.json`, "utf-8")
);

const documents = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/documents.json`, "utf-8")
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

// Inport into DB
const importData = async () => {
  try {
    await News.create(news);
    await Document.create(documents);
    await User.create(users);
    console.log("Data imported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await News.deleteMany();
    await Document.deleteMany();
    await User.deleteMany();
    console.log("Data destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
