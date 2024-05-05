const AWS = require('aws-sdk');
const { randomUUID } = require('crypto');
AWS.config.update({
  region: 'eu-west-1',
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();


function uploadimage(image64, contentType, extension){
    const imageBuffer=Buffer.from(image64,'base64');
    const key=randomUUID();
    var sendingThisToS3 = {
      Bucket: 'webstagram-backend-photo-bucket',
      Key: key+extension,
      Body: imageBuffer,
      ContentType: contentType
    }
    console.log(sendingThisToS3);
    s3.upload(sendingThisToS3, (err, data) => {
      if (err){
      throw(err)
      } else {
       return key+extension;
      }
    })
}
module.exports={uploadimage}