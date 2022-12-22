require('dotenv').config();
const crypto = require('crypto');
const path = require('path');
const port = process.env.PORT;
const User = require('../server/models/user_model');
const {TOKEN_SECRET} = process.env;
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const multer = require('multer');
const fs = require('fs');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const imagePath = path.join(__dirname, `../img`);
            if (!fs.existsSync(imagePath)) {
                fs.mkdirSync(imagePath);
            }
            cb(null, imagePath);
        },
        filename: (req, file, cb) => {
            // cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));
            cb(null, file.originalname);
        }
    })
});

const wrapAsync = (fn) => {
    return function(req, res, next) {
        fn(req, res, next).catch(next);
    };
};

const authentication = () => {
    return async function (req, res, next) {
        let accessToken = req.get('Authorization');
        if (!accessToken) {
            console.log("!accessToken")
            res.status(401).send({error: 'Unauthorized'});
            return;
        }

        accessToken = accessToken.replace('Bearer ', '');
        if (accessToken == 'null') {
            console.log("accessToken == 'null'")
            res.status(401).send({error: 'Unauthorized'});
            return;
        }

        try {
            const user = await promisify(jwt.verify)(accessToken, TOKEN_SECRET);
            req.user = user;
            next();
            return;
        } catch(err) {
            res.status(403).send({error: 'Forbidden'});
            return;
        }
    };
};


module.exports = {
    upload,
    wrapAsync,
    authentication,
};