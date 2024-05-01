
const express = require('express');
const app = express();
const PORT = 5000;

const protectedRoute = require('./Controllers/HelloWorldController');
const loginRoute=require("./Controllers/LoginController");
const corsMiddleware=require("./Middleware/corsMiddleware")
// CORS middleware

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

app.get('/healthcheck', (request, result) => {
  result.status(200);
  result.set('Content-Type', 'text/html');
  result.send("<h1>Health Good</h1>");
});

