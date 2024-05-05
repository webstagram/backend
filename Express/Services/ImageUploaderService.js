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
  var sendingThisToS3 = {
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

async function uploadPosts(userId, webName, posts){
  try {
    await sql.connect(sqlConfig);
    // See if the web exists
    var request = new sql.Request();
    var queryResult = (await request.query(`SELECT WebId FROM Webs WHERE [Name]=\'${webName}\' AND UserId=${userId}`)).recordset;
    // var webId = 0;
    if (queryResult.length==0){
      var query = `INSERT INTO Webs OUTPUT inserted.WebId VALUES (\'${webName}\', ${userId})`;
      request = new sql.Request();
      queryResult = (await request.query(query)).recordset;
    }
    var  webId = queryResult[0].WebId;
    
    // Add the posts and the images to the Web
    // Get TopicId
    // Add post to DB
    // Add images to DB
    // Add images to S3
    // Add posts to the web
    for (var post of posts){
      var topic = post.Topic;
      // See if topic exists
      var query = `SELECT TopicId From Topics WHERE [Name]=\'${topic}\'`;
      request = new sql.Request();
      queryResult = (await request.query(query)).recordset;
      if (queryResult.length==0){// If topic no existo, addo topico
        var query = `INSERT INTO Topics OUTPUT inserted.TopicId VALUES (\'${topic}\')`;
        request = new sql.Request();
        queryResult = (await request.query(query)).recordset;
      }
      var topicId = queryResult[0].TopicId;

      // Add the post to the Db:
      query = `INSERT INTO Posts OUTPUT inserted.PostId VALUES (\'${post.Caption}\', ${topicId}, \'${new Date().toLocaleString('lt-LT')}\', ${webId})`;
      request = new sql.Request();
      var postId = (await request.query(query)).recordset[0].PostId;

      // Idd images to S3 and return the path:
      for (var image of post.Images){
        var fileName = uploadimage(image.FileContent, image.ContentType, image.Extension);
        var imagePath = "https://webstagram-backend-photo-bucket.s3.eu-west-1.amazonaws.com/"+fileName;
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