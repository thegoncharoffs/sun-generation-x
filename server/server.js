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

// Utils
const { initFilesConfig } = require("./utils/filesConfig");
const { initNewsConfig } = require("./utils/newsConfig");

// Init news and files configs
initFilesConfig();
initNewsConfig();

// Init app
const app = express();

// Init middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(fileUpload());

// Init controllers
app.use("/api", auth);
app.use("/api", file);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App running at ${process.env.PORT || 3000}`);
});
