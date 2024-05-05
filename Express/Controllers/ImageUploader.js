
const express = require('express');
const { uploadimage } = require('../Services/ImageUploaderService');
const router = express.Router();

router.post('/uploadimage', (req, res) => {

    try { 
        var guid=uploadimage(req.body.fileContent, req.body.contentType, req.body.extension);
        res.status(200).send("good");
    } catch (error) {
        res.set(400).send(error)
    }
});

module.exports = router;