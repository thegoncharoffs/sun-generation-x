const fs = require("fs");
const path = require("path");

exports.readFilesConfig = () => {
  try {
    return JSON.parse(
      fs
        .readFileSync(path.join(__dirname, "/../data/filesConfig.json"))
        .toString()
    );
  } catch (error) {
    return null;
  }
};

exports.updateFilesConfig = (config) => {
  fs.writeFileSync(
    path.join(__dirname, "/../data/filesConfig.json"),
    Buffer.from(JSON.stringify(config))
  );
};

exports.initFilesConfig = () => {
  filesConfig = [
    {
      title: {
        en: "Documents 1",
        ru: "Документы 1",
      },
      directoryName: "files1",
      fileNames: [],
    },
    {
      title: {
        en: "Documents 2",
        ru: "Документы 2",
      },
      directoryName: "files2",
      fileNames: [],
    },
  ];

  filesFolder = path.join(__dirname, "/../data/files");

  fs.mkdirSync(filesFolder);

  filesConfig.forEach((element) => {
    const groupFolder = path.join(filesFolder, element.directoryName);
    fs.mkdirSync(groupFolder);
    element.fileNames = [];
  });
  this.updateFilesConfig(filesConfig);
};
