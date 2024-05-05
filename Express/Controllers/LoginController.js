
const express = require('express');
const router = express.Router();
const {authAndReturnJWT}= require('../Services/LoginService');

router.get('/github/callback', async (request, result) => {
    const requestToken = request.query.code;
    try {
        const userData = await authAndReturnJWT(requestToken);
         result.json(userData);
    } catch (error) {
        result.status(400).send(error.message);
    }
});

module.exports = router;