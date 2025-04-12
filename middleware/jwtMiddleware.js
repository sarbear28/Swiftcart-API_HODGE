const jwt = require('jsonwebtoken');
const { sequelize } = require('../models');
const User = require('../models/User')(sequelize, require('sequelize').DataTypes);


// JWT Authentication 
const authenticateJWT = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
      }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded; 
        const user = await User.findByPk(decoded.user_id); // Fetch user from DB to ensure it exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid token. User not found.' });
        }
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticateJWT;
