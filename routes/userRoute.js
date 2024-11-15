const express = require('express');
const verifyToken = require("../middlewares/authMiddleware")
const authorizeRoles = require("../middlewares/roleMiddleware")
const router = express.Router();

// Only admin can acesss this route

router.get('/admin', verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" })
})

// Both admin and manager can access this route
router.get('/manager', verifyToken, authorizeRoles("admin", "generalManager"), (req, res) => {
    res.json({ message: "Welcome Manager" })
})
// All can access this router

router.get('/user', verifyToken, authorizeRoles("admin", "generalManager", "user"), (req, res) => {
    res.json({ message: "Welcome User" })
})

module.exports = router