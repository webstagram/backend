const express = require('express');
const { uploadPosts } = require('../Services/ImageUploaderService');
const verifyToken = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/uploadposts', verifyToken, (req, res) => {

    try { 
        var userId = res.userID;
        var webName = req.body.WebName;
        var posts = req.body.Posts;
        console.log(req);
        console.log(userId);
        console.log(webName);
        console.log(posts);
        // var guid=uploadPosts(userId, webName, posts);
        res.status(200).send("good");
    } catch (error) {
        if (error){
        res.set(400).send(error)
        } else {
            res.set(400).send({"Message": "Error in uploading post/web"});
        }
    }
});

module.exports = router;