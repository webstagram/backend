const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/authMiddleware');
// Protected route due to the verify token
router.get('/', verifyToken, (req, res) => {
res.status(200).json({ message: `hello ${req.userName}` });
});

module.exports = router;