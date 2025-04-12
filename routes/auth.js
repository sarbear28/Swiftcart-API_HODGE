const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../models');

const router = express.Router();
//Login route
router.post('/login', async (req, res) => {
  const { email } = req.body;
// find user by email
  try {
    const user = await db.User.findOne({ where: { email } });
// if the user email can't be found, return error
    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    // Generate JWT token for user that expires in 1hr
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
// if failed, return error and log error in terminal
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
