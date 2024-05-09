const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/authMiddleware');
const {getWebsWithTopics, getWebTitle, getWebPosts} = require("../Services/WebService");
// Protected route due to the verify token
router.get('/', verifyToken, async (request, result) => {
    try {
        const userData = await getWebsWithTopics(result.userID);
         result.json(userData);
    } catch (error) {
        result.status(400).send(error.message);
    }
});

router.get('/postsinweb', verifyToken, async (request, result)=>{
    try{
        let inputtedId = parseInt(request.query.webId);
        if (inputtedId != request.query.webId){
            result.status(400);
            result.set('Content-Type', 'application/text');
            result.send("Web ID Provided is not valid");
            return;
        }
        let webTitle = await getWebTitle(inputtedId);
        let webPosts = await getWebPosts(inputtedId);
        result.status(200);
        result.set('Content-Type', 'application/json');
        result.send({ webTitle, webPosts });
    }
        catch (err){
            result.status(400);
            result.set('Content-Type', 'application/text');
            result.send("Web ID Provided is not valid");
        }
  })

module.exports = router;