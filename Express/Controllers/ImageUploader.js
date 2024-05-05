const express = require('express');
const { uploadPosts } = require('../Services/ImageUploaderService');
const router = express.Router();

router.post('/uploadposts', (req, res) => {

    try { 
        var userId = req.body.UserId;
        var webName = req.body.WebName;
        var posts = req.body.Posts;
        var guid=uploadPosts(userId, webName, posts);
        res.status(200).send("good");
    } catch (error) {
        res.set(400).send(error)
    }
});

module.exports = router;