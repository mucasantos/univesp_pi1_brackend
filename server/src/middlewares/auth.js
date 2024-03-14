const jwtService = require("jsonwebtoken");

const validate_jwt = (req, res, next) => {
    const jwt = req.headers["authorization"];
    const chavePrivada = "@frexco-token";

    // Efetuando a validação do JWT:
    jwtService.verify(jwt, chavePrivada, (err, userInfo) => {
        if (err) {
            res.status(403).end();
            return;
        }
        req.userInfo = userInfo;
        next();
    });
};

module.exports = validate_jwt;