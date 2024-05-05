const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/authMiddleware');
const {getWebsWithTopics, getWebPosts} = require("../Services/WebService");
// Protected route due to the verify token
router.get('/', verifyToken, async (request, result) => {
    try {
        const userData = await getWebsWithTopics();
         result.json(userData);
    } catch (error) {
        result.status(400).send(error.message);
    }
});

router.get('/postsinweb', verifyToken, async (request, result)=>{
    try{
        var inputtedId = parseInt(request.query.webId);
        if (inputtedId != request.query.webId){
            result.status(400);
            result.set('Content-Type', 'application/text');
            result.send("Web ID Provided is not valid");
            return;
        }
        
        var webPosts = await getWebPosts(inputtedId);
        result.status(200);
        result.set('Content-Type', 'application/json');
        result.send(webPosts);
    }
        catch (err){
            result.status(400);
            result.set('Content-Type', 'application/text');
            result.send("Web ID Provided is not valid");
        }
  })

module.exports = router;