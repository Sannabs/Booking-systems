const express = require('express');
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();

router.get('/admin', verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" });
});

router.get('/manager', verifyToken, authorizeRoles("admin", "generalManager"), (req, res) => {
    res.json({ message: "Welcome General Manager" });
});

router.get('/user', verifyToken, authorizeRoles("admin", "secretary", "generalManager", "headofMarket"), (req, res) => {
    res.json({ message: "Welcome User" });
});

module.exports = router;
