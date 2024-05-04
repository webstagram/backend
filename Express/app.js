
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

const protectedRoute = require('./Controllers/HelloWorldController');
const loginRoute=require("./Controllers/LoginController");
app.use(bodyParser.json());

const corsMiddleware=require("./Middleware/corsMiddleware")
// CORS middleware

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

  if (successfulUpload){
    res.status(200).json({ message: `Image uploaded successfully` });
  } else {
    res.status(400).json({ message: `Error in uploading image!` });
  }
});


// Apply CORS middleware globally
app.use(corsMiddleware);
app.use('/helloworld', protectedRoute)
app.use('/', loginRoute)
app.listen(PORT, (error) => {
  if (!error)
    console.log("Server is Successfully Running, and App is listening on port " + PORT)
  else
    console.log("Error occurred, server can't start", error);
}
);
