const express = require('express');
const { uploadPosts } = require('../Services/ImageUploaderService');
const verifyToken = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/uploadposts', verifyToken, async (req, res) => {

    try { 
        var userId = res.userID;
        var webName = req.body.WebName;
        var posts = req.body.Posts;
        var guid=await uploadPosts(userId, webName, posts);
        res.status(200).send("good");
    } catch (error) {
        if (error){
            if(error==="Web with this name already exists") res.status(409).send(error);
            res.status(400).send(error)
        } else {
            res.status(400).send({"Message": "Error in uploading post/web"});
        }
    }
});

module.exports = router;