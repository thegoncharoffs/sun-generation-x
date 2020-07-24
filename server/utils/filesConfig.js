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
        en: "2",
        ru: "Эмисионные документы",
      },
      directoryName: "files1",
      fileNames: [],
    },
    {
      title: {
        en: "2",
        ru: "Эмисионные документы2",
      },
      directoryName: "files2",
      fileNames: [],
    },
  ];

  filesPath = path.join(__dirname, "../data/files");

  filesConfig.forEach((element) => {
    element.fileNames = fs.readdirSync(
      path.join(filesPath, element.directoryName)
    );
  });
  this.updateFilesConfig(filesConfig);
};
