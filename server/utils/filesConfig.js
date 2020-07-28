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
        ru: "Внутренние Документы",
        en: "Internal Documents",
      },
      fileNames: [],
    },
    {
      title: {
        ru: "Бухгалтерская Отчетность",
        en: "Accounting Report",
      },
      fileNames: [],
    },
    {
      title: {
        ru: "Эмиссионные Документы",
        en: "Equity Instruments",
      },
      fileNames: [],
    },
    {
      title: {
        ru: "Отчет Расчетного Агента",
        en: "Settlement Agent Report",
      },
      fileNames: [],
    },
    {
      title: {
        ru: "Отчет Эмитента Облигаций",
        en: "Report of the Bond Issuer",
      },
      fileNames: [],
    },
    {
      title: {
        ru: "Отчет Сервисного Агента",
        en: "Service Agent Report",
      },
      fileNames: [],
    },
    {
      title: {
        ru: "Сообщения Эмитента",
        en: "Messages Of The Issuer",
      },
      fileNames: [],
    },
    {
      title: {
        ru: "Внешняя Оценка и Отчет",
        en: "External Evaluation and Report",
      },
      fileNames: [],
    },
  ];

  filesFolder = path.join(__dirname, "/../data/files/files");

  if (!fs.existsSync(filesFolder)) {
    fs.mkdirSync(filesFolder);
  }

  filesConfig.forEach((element, id) => {
    const groupFolder = path.join(filesFolder + id);

    if (!fs.existsSync(groupFolder)) {
      fs.mkdirSync(groupFolder);
    }

    element.fileNames = [];
  });

  this.updateFilesConfig(filesConfig);
};
