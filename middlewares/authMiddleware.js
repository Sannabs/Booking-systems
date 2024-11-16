const { verify } = require('crypto')
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token;
    if (req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers.Authorization || req.headers.authorization) {
        const authHeader = req.headers.Authorization || req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
        }
    }

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).json({ message: "Token is not valid" });
    }
};

module.exports = verifyToken;
