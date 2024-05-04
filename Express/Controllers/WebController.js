const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/authMiddleware');
const {getWebsWithTopics} = require("../Services/WebService");
// Protected route due to the verify token
router.get('/', verifyToken, async (request, result) => {
    try {
        const userData = await getWebsWithTopics();
         result.json(userData);
    } catch (error) {
        result.status(400).send(error.message);
    }
});

module.exports = router;