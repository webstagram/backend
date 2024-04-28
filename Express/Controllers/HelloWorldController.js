const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/authMiddleware');
// Protected route
router.get('/', verifyToken, (req, res) => {
res.status(200).json({ message: `hello ${req.user}` });
});

module.exports = router;