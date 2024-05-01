const frontend=process.env.FRONT_END_URL || 'http://localhost:5500';
const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', frontend); // Allow requests from your frontend
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Specify methods you want to allow
    next(); // Pass control to the next middleware function
  };

module.exports= corsMiddleware;