const express = require('express');
const app = express();
const PORT = 8080;
const protectedRoute = require('./Controllers/HelloWorldController');
const loginRoute=require("./Controllers/LoginController");
const webRoute=require("./Controllers/WebController");
const imageRoute=require("./Controllers/ImageUploader");
const likesRoute=require("./Controllers/LikesController");
const usersRoute=require("./Controllers/UserController");
const corsMiddleware=require("./Middleware/corsMiddleware");

app.use(corsMiddleware);

// for parsing application/json
app.use(express.json({ limit: '52mb' })); 

app.get('/healthcheck', (request, result) => {
  result.status(200);
  result.set('Content-Type', 'text/html');
  result.send("<h1>Health Good</h1>");
});

app.use('/helloworld', protectedRoute)
app.use('/', loginRoute)
app.use('/', imageRoute)
app.use('/', likesRoute)
app.use('/webs', webRoute);
app.use('/users', usersRoute);

app.listen(PORT, (error) => {
  if (!error)
    console.log("Server is Successfully Running, and App is listening on port " + PORT)
  else
    console.log("Error occurred, server can't start", error);
}
);
