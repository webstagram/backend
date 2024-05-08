const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/authMiddleware');
const {getLikeCount, getLikeStatus, likeWeb, unlikeWeb} = require("../Services/LikeService");

router.get('/weblikecount', verifyToken, async (request, result)=>{
  try{
    let webId = parseInt(request.query.webId);
    if (webId != request.query.webId){
      result.status(400);
      result.set('Content-Type', 'application/text');
      result.send("Web ID Provided is not valid");
      return;
    }
    let likeCount = await getLikeCount(webId);
    result.status(200);
    result.set('Content-Type', 'application/json');
    result.send({ likeCount });
  }
  catch (err){
      result.status(400);
      result.set('Content-Type', 'application/text');
      result.send("Web ID Provided is not valid");
  }
})

router.get('/likestatus', verifyToken, async (request, result)=>{
  try{
    let webId = parseInt(request.query.webId);
    let userId = parseInt(request.query.userId);
    if (webId != request.query.webId || userId != request.query.userId){
      result.status(400);
      result.set('Content-Type', 'application/text');
      result.send("ID Provided is not valid");
      return;
    }
    let likeStatus = await getLikeStatus(webId, userId);
    result.status(200);
    result.set('Content-Type', 'application/json');
    result.send({ likeStatus });
  }
  catch (err){
      result.status(400);
      result.set('Content-Type', 'application/text');
      result.send("ID Provided is not valid");
  }
})

router.post('/like', verifyToken, async (request, result)=>{
  try{
    let webId = parseInt(request.query.webId);
    let userId = parseInt(request.query.userId);
    if (webId != request.query.webId || userId != request.query.userId){
      result.status(400);
      result.set('Content-Type', 'application/text');
      result.send("ID Provided is not valid");
      return;
    }
    await likeWeb(webId, userId);
    result.status(200);
    result.set('Content-Type', 'application/text');
    result.send("Liked");
  }
  catch (err){
      result.status(400);
      result.set('Content-Type', 'application/text');
      result.send("ID Provided is not valid");
  }
})

router.post('/unlike', verifyToken, async (request, result)=>{
  try{
    let webId = parseInt(request.query.webId);
    let userId = parseInt(request.query.userId);
    if (webId != request.query.webId || userId != request.query.userId){
      result.status(400);
      result.set('Content-Type', 'application/text');
      result.send("ID Provided is not valid");
      return;
    }
    await unlikeWeb(webId, userId);
    result.status(200);
    result.set('Content-Type', 'application/text');
    result.send("Unliked");
  }
  catch (err){
      result.status(400);
      result.set('Content-Type', 'application/text');
      result.send("ID Provided is not valid");
  }
})

module.exports = router;