const express = require("express");
const path = require("path");
const fs = require("fs");
const { readFilesConfig, updateFilesConfig } = require("../utils/filesConfig");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

function getFiles(req, res) {
  res.status(200).send(readFilesConfig());
}

function uploadFiles(req, res) {
  const directoryName = req.body.directoryName;
  const files = req.files;
  const filesConfig = readFilesConfig();

  if (!files || Object.keys(files).length === 0 || !directoryName) {
    return res.status(400).send("No files were uploaded.");
  }

  const dirConfig = filesConfig.find(
    (dirConfig) => dirConfig.directoryName === directoryName
  );

  if (!dirConfig) {
    return res.status(400).send("No such directory");
  }

  const directoryPath = path.join(__dirname, "../data/files", directoryName);

  // Combine async files move promises
  const promiseArr = [];
  for (let prop in files) {
    if (files.hasOwnProperty(prop)) {
      const file = files[prop];
      promiseArr.push(file.mv(path.join(directoryPath, file.name)));
    }
  }

  // When all files are uploaded
  Promise.all(promiseArr).then(
    () => {
      // Read all files in directory
      dirConfig.fileNames = fs.readdirSync(directoryPath);
      updateFilesConfig(filesConfig);
      // Send updated filesConfig
      res.status(200).send(filesConfig);
    },
    (err) => res.status(500).send(err)
  );
}

function deleteFile(req, res) {
  const directoryName = req.query.directoryName;
  const fileName = req.query.fileName;

  const filesConfig = readFilesConfig();

  if (!directoryName) {
    return res.status(400).send("DirectoryName is not specified");
  }

  if (!fileName) {
    return res.status(400).send("FileName is not specified");
  }

  const dirConfig = filesConfig.find(
    (dirConfig) => dirConfig.directoryName === directoryName
  );

  if (!dirConfig) {
    return res.status(400).send("No such directory");
  }

  const directoryPath = path.join(__dirname, "../data/files", directoryName);

  // Delete file async
  fs.unlink(path.join(directoryPath, fileName), (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    // Read all files in directory
    dirConfig.fileNames = fs.readdirSync(directoryPath);
    updateFilesConfig(filesConfig);
    // Send updated filesConfig
    res.status(200).send(filesConfig);
  });
}

function downloadFile(req, res) {
  const directoryName = req.query.directoryName;
  const fileName = req.query.fileName;
  res.download(path.join(__dirname, "../data/files", directoryName, fileName));
}

router
  .get("/all", getFiles)
  .get("", downloadFile)
  .post("", verifyToken, uploadFiles)
  .delete("", verifyToken, deleteFile);

module.exports = router;
