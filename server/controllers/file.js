const express = require("express");
const streamBuffers = require("stream-buffers");
const { createModel } = require("mongoose-gridfs");
const verifyToken = require("../middlewares/verifyToken");
const Document = require("../models/Document");

const router = express.Router();

const getFiles = async (req, res) => {
  res.status(200).send(await Document.find({}));
};

const uploadFiles = async (req, res) => {
  const groupId = req.body.groupId;
  const files = req.files;

  if (!groupId) {
    return res.status(400).send("No froup id provided");
  }

  if (!files || Object.keys(files).length === 0) {
    return res.status(400).send("No files were uploaded");
  }

  const group = await Document.findById(groupId);

  if (!group) {
    return res.status(400).send("No such group");
  }

  if (!files || files.length === 0) {
    return res.status(400).send("No files provided");
  }

  // Use default bucket for files
  const Files = createModel();

  // Combine async files move promises
  for (let prop in files) {
    if (files.hasOwnProperty(prop)) {
      const file = files[prop];

      // Making file's readable stream for gridfs
      const readableStream = new streamBuffers.ReadableStreamBuffer({
        frequency: 0, // in milliseconds.
        chunkSize: 32768, // in bytes.
        initialSize: file.size,
      });
      readableStream.put(file.data);
      readableStream.stop();

      const options = { filename: file.name, contentType: file.mimetype };

      // Saving files to db and save their metadata
      Files.write(options, readableStream, async (error, file) => {
        if (error) {
          return res.status(500).send("File save failure");
        }

        // Add name of file and id to group
        await group.updateOne({
          $push: {
            files: {
              name: file.filename,
              id: file._id,
            },
          },
        });

        // Sending updated documents
        res.status(200).send(await Document.find({}));
      });
    }
  }
};

const deleteFile = async (req, res) => {
  const { groupId, fileId } = req.query;

  if (!groupId) {
    return res.status(400).send("No group id provided");
  }

  if (!fileId) {
    return res.status(400).send("No file id provided");
  }

  let group = await Document.findById(groupId);

  if (!group) {
    return res.status(400).send("No such group");
  }

  group = await group.updateOne({ $pull: { files: { id: fileId } } });

  if (!group) {
    return res.status(400).send("Group update failure");
  }

  // Use default bucket for files
  const Files = createModel();

  Files.unlink(fileId, async (error) => {
    if (error) {
      return res.status(400).send("Delete failure");
    }

    res.status(200).send(await Document.find({}));
  });
};

const downloadFile = async (req, res) => {
  const { fileId } = req.query;

  if (!fileId) {
    return res.status(400).send("No file id provided");
  }

  // Use default bucket for files
  const Files = createModel();

  Files.findById(fileId, (error, file) => {
    if (error) {
      return res.status(400).send("File with such id was not found");
    }

    const readStream = file.read();
    readStream.pipe(res);
  });
};

router
  .get("/all", getFiles)
  .get("", downloadFile)
  .post("", verifyToken, uploadFiles)
  .delete("", verifyToken, deleteFile);

module.exports = router;
