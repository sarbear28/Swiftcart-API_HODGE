const express = require('express');
const db = require('../models');
const authenticateJWT = require('../middleware/jwtMiddleware');
const router = express.Router();

// Route to get user info
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { user_id: req.user.user_id } });// Find user based on the decoded JWT
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user' });
  }
});

module.exports = router;
