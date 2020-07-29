const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");

// Load env variables
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// Controllers
const auth = require("./controllers/auth");
const file = require("./controllers/file");
const news = require("./controllers/news");

// Utils
const { initFilesConfig } = require("./utils/filesConfig");
const { initNewsConfig } = require("./utils/newsConfig");

// Init news and files configs
initFilesConfig();
initNewsConfig();

// Init app
const app = express();

// Set Static Folder
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "/data/files")));

// Init middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(fileUpload());

// Init controllers
app.use("/api", auth);
app.use("/api/files", file);
app.use("/api/news", news);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App running at ${process.env.PORT || 3000}`);
});
