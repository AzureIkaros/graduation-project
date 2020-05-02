const jwt = require("jsonwebtoken");
const KEY = "ENCRYPT_TOKEN";

const encryptToken = (payload) => {
    token = jwt.sign(payload, KEY, {
        expiresIn: 3600
    });
    return token;
}


const checkToken = (token, res,callback) => {
    jwt.verify(token, KEY, (err, decode) => {
        if (err) {
            switch (err.name) {
                case 'JsonWebTokenError':
                    res.json({
                        status:0,
                        error:5
                    });
                    return false;
                case 'TokenExpiredError':
                    res.json({
                        status:0,
                        error:5
                    });
                    return false;
            }
        }
        callback()
    })
}


module.exports = {
    encryptToken,
    checkToken
}