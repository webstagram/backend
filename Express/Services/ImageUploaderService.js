const AWS = require('aws-sdk');
const { randomUUID } = require('crypto');
const sql = require('mssql');
const sqlConfig = require('../Database/DbInit');

AWS.config.update({
  region: 'eu-west-1',
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();


function uploadimage(image64, contentType, extension){
  const imageBuffer=Buffer.from(image64,'base64');
  const key=randomUUID();
  const result = key+extension;
  let sendingThisToS3 = {
    Bucket: 'webstagram-backend-photo-bucket',
    Key: result,
    Body: imageBuffer,
    ContentType: contentType
  }
  s3.upload(sendingThisToS3, (err, data) => {
    if (err){
    throw(err)
    } else {
     return result;
    }
  })
  return result;
}

function fixApostropheIssue(str){
  let ans = str.replace(/'/g, "''");
  return ans;
}

async function uploadPosts(userId, webName, posts, tags){
  try {
    await sql.connect(sqlConfig);
    // See if the web exists
    let webTagUserIds = [];
    for (let userName of tags){
      let query = `SELECT UserId FROM Users WHERE Name='${fixApostropheIssue(userName)}'`;
      let request = new sql.Request();
      let uID_returned = (await request.query(query)).recordset[0].UserId;
      webTagUserIds.push(uID_returned);
    }
    console.log(webTagUserIds);
    

    webName = fixApostropheIssue(webName);
    let query = `INSERT INTO Webs OUTPUT inserted.WebId VALUES (\'${webName}\', ${userId})`;
    let request = new sql.Request();
    let queryResult = (await request.query(query)).recordset;
    let  webId = queryResult[0].WebId;
    
    for (let uID of webTagUserIds){
      let query = `INSERT INTO Tags (UserId, WebId) VALUES (${uID}, ${webId})`;
      let request = new sql.Request();
      let queryResult = (await request.query(query));
    }

    // Add the posts and the images to the Web
    // Get TopicId
    // Add post to DB
    // Add images to DB
    // Add images to S3
    // Add posts to the web

    for (let post of posts){
      let topic = post.Topic;
      topic = fixApostropheIssue(topic);
      // See if topic exists
      let query = `SELECT TopicId From Topics WHERE [Name]=\'${topic}\'`;
      request = new sql.Request();
      queryResult = (await request.query(query)).recordset;
      if (queryResult.length==0){// If topic no existo, addo topico
        let query = `INSERT INTO Topics OUTPUT inserted.TopicId VALUES (\'${topic}\')`;
        request = new sql.Request();
        queryResult = (await request.query(query)).recordset;
      }
      let topicId = queryResult[0].TopicId;

      // Add the post to the Db:
      let postCaption = fixApostropheIssue(post.Caption);
      query = `INSERT INTO Posts (Caption, TopicId, WebId) OUTPUT inserted.PostId VALUES (\'${postCaption}\', ${topicId}, ${webId})`;
      request = new sql.Request();
      let postId = (await request.query(query)).recordset[0].PostId;

      // Idd images to S3 and return the path:
      for (let image of post.Images){
        let fileName = uploadimage(image.FileContent, image.ContentType, image.Extension);
        let imagePath = "https://webstagram-backend-photo-bucket.s3.eu-west-1.amazonaws.com/"+fileName;
        imagePath = fixApostropheIssue(imagePath);
        query = `INSERT INTO Images VALUES (${postId}, \'${imagePath}\')`;
        request = new sql.Request();
        queryResult = (await request.query(query));
      }
    }
    return 1;// result;
  } catch (err) {
    console.error('Error uploading web/images/posts', err);
    throw err; 
  }
}
module.exports={uploadPosts}