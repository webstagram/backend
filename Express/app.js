const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;
const protectedRoute = require('./Controllers/HelloWorldController');
const loginRoute=require("./Controllers/LoginController");
// Apply CORS middleware globally
const webRoute=require("./Controllers/WebController");
const corsMiddleware=require("./Middleware/corsMiddleware");

app.use(corsMiddleware);

app.use(bodyParser.json());

const AWS = require('aws-sdk');
AWS.config.update({
  region: 'eu-west-1',
  // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const s3 = new AWS.S3();

app.get('/healthcheck', (request, result) => {
  result.status(200);
  result.set('Content-Type', 'text/html');
  result.send("<h1>Health Good</h1>");
});


app.post('/uploadimage', (req, res) => {
var successfulUpload=true;

  var sendingThisToS3 = {
    Bucket: 'webstagram-backend-photo-bucket',
    Key: req.body.fileName,
    Body: req.body.fileContent
  }
  console.log(sendingThisToS3);
  s3.upload(sendingThisToS3, (err, data) => {
    if (err){
      res.status(400).json({ message: `Error in uploading image: ${err}` });
    } else {
      res.status(200).json({ message: `Image uploaded successfully` });
    }
  })
});



app.use('/helloworld', protectedRoute)
app.use('/', loginRoute)
app.use('/webs', webRoute);
app.listen(PORT, (error) => {
  if (!error)
    console.log("Server is Successfully Running, and App is listening on port " + PORT)
  else
    console.log("Error occurred, server can't start", error);
}
);
