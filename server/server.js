const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const fileUpload = require('express-fileupload');

const app = express();
const USERS = [
    {id: 1, login: 'boris', password: bcrypt.hashSync('boris', 8)}
];
const SECRET = 'some secret';
const CONFIG_PATH = path.join(__dirname, 'config.json');

// Helpers
function readConfig() {
    return JSON.parse(fs.readFileSync(CONFIG_PATH).toString());
}

function updateConfig(config) {
    fs.writeFileSync(CONFIG_PATH, Buffer.from(JSON.stringify(config)));
}

// Middlewares
function verifyToken(req, res, next) {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.body.id = decoded['id'];
        next();
    });
}

// Init Middlewares
app.use(cors({origin: "*"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

// Routes
app.post('/api/login', function (req, res) {
    // Search for user in list
    const foundUser = USERS.find(user => user.login === req.body.login);

    if (!foundUser) {
        return res.status(404).send({message: "User Not found."});
    }

    // Comparing passwords
    const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        foundUser.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }

    // Generating new token by secret word sync
    const token = jwt.sign({id: foundUser.id}, SECRET, {
        expiresIn: '1h',
    });

    // Send user
    res.status(200).send({
        id: foundUser.id,
        login: foundUser.login,
        roles: foundUser.roles,
        accessToken: token
    });
});

app.get('/api/config', function (req, res) {
    res.send(readConfig());
});

// Upload new files
app.post("/api/upload", verifyToken, function (req, res) {
    const directoryName = req.body.directoryName;
    const files = req.files;
    const config = readConfig();

    if (!files || Object.keys(files).length === 0 || !directoryName) {
        return res.status(400).send('No files were uploaded.');
    }

    const dirConfig = config.find(dirConfig => dirConfig.directoryName === directoryName);

    if (!dirConfig) {
        return res.status(400).send('No such directory');
    }

    const directoryPath = path.join(__dirname, directoryName);

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
            updateConfig(config);
            // Send updated config
            res.status(200).send(config);
        },
        (err) => res.status(500).send(err)
    );
});

// Remove file
app.delete("/api/delete", verifyToken, function (req, res) {
    const directoryName = req.query.directoryName;
    const fileName = req.query.fileName;

    const config = readConfig();

    if (!directoryName) {
        return res.status(400).send('DirectoryName is not specified');
    }

    if (!fileName) {
        return res.status(400).send('FileName is not specified');
    }

    const dirConfig = config.find(dirConfig => dirConfig.directoryName === directoryName);

    if (!dirConfig) {
        return res.status(400).send('No such directory');
    }

    const directoryPath = path.join(__dirname, directoryName);
    // Delete file async
    fs.unlink(path.join(directoryPath, fileName), (err) => {
        if (err) {
            res.status(500).send(err);
        }
        // Read all files in directory
        dirConfig.fileNames = fs.readdirSync(directoryPath);
        updateConfig(config);
        // Send updated config
        res.status(200).send(config);
    });
});

// Download new files
app.get("/api/download", function (req, res) {
    const directoryName = req.query.directoryName;
    const fileName = req.query.fileName;
    res.download(path.join(__dirname, directoryName, fileName));
});

app.listen(3000, () => {
    console.log('App running at 3000')
});
