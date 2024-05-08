const sql = require('mssql');
const sqlConfig = require('../Database/DbInit');

async function getLikeCount(webId){
    if (!(Number.isInteger(webId))){
        var err = "webId is not an integer";
        throw(err);
    }
    try {
        await sql.connect(sqlConfig);
        const request = new sql.Request();
        const result = await request.query(`SELECT COUNT(*) AS LikeCount FROM Likes WHERE WebId=${webId}`);
        return result.recordset[0].LikeCount;
    } catch (err) {
        console.error('Error getting like count', err);
        throw err; 
    }
}

async function getLikeStatus(webId, userId){
    if (!(Number.isInteger(webId)) || !(Number.isInteger(userId))){
        var err = "webId or userId is not an integer";
        throw(err);
    }
    try {
        await sql.connect(sqlConfig);
        const request = new sql.Request();
        const result = await request.query(`SELECT COUNT(*) AS LikeCount FROM Likes WHERE WebId=${webId} AND UserId=${userId}`);
        return result.recordset[0].LikeCount;
    } catch (err) {
        console.error('Error getting like status', err);
        throw err; 
    }
}

async function likeWeb(webId, userId){
  if (!(Number.isInteger(webId)) || !(Number.isInteger(userId))){
    var err = "webId or userId is not an integer";
    throw(err);
  }
  try {
    const checkLiked = await getLikeStatus(webId, userId);
    if (checkLiked > 0) {
      throw new Error("User has already liked this web");
    }
    await sql.connect(sqlConfig);
    const request = new sql.Request();
    const result = await request.query(`INSERT INTO Likes (WebId, UserId) VALUES (${webId}, ${userId})`);
    return result;
  } catch (err) {
    console.error('Error liking web', err);
    throw err; 
  }
}

async function unlikeWeb(webId, userId){
  if (!(Number.isInteger(webId)) || !(Number.isInteger(userId))){
    var err = "webId or userId is not an integer";
    throw(err);
  }
  try {
    const checkLiked = await getLikeStatus(webId, userId);
    if (checkLiked == 0) {
      throw new Error("User has not liked this web");
    }
    await sql.connect(sqlConfig);
    const request = new sql.Request();
    const result = await request.query(`DELETE FROM Likes WHERE WebId=${webId} AND UserId=${userId}`);
    return result;
  } catch (err) {
    console.error('Error unliking web', err);
    throw err; 
  }
}
  
module.exports={getLikeCount, getLikeStatus, likeWeb, unlikeWeb};