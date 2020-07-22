const fs = require("fs");
const path = require("path");

exports.readNewsConfig = () => {
  try {
    return JSON.parse(
      fs
        .readFileSync(path.join(__dirname, "/../data/newsConfig.json"))
        .toString()
    );
  } catch (error) {
    return null;
  }
};

exports.updateNewsConfig = (config) => {
  fs.writeFileSync(
    path.join(__dirname, "/../data/newsConfig.json"),
    Buffer.from(JSON.stringify(config))
  );
};

exports.initNewsConfig = () => {
  newsConfig = this.readNewsConfig();
  if (!newsConfig) {
    this.updateNewsConfig([]);
  }
};
