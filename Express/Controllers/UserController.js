const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/authMiddleware');
const userService = require('../Services/UserService')

router.get('/', verifyToken, async (request, result) => {
  try {
    const data = await userService.getAllUsers();

    result.status(200);
    result.json(data);

  } catch (error) {
    result.status(400);
  }
});

module.exports = router;