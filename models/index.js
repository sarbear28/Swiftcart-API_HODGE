// models/index.js
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load all models
db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.Product = require('./Product')(sequelize, Sequelize.DataTypes);
db.ProductCategory = require('./ProductCategory')(sequelize, Sequelize.DataTypes);
db.Cart = require('./Cart')(sequelize, Sequelize.DataTypes);
db.CartItem = require('./CartItem')(sequelize, Sequelize.DataTypes);
db.Order = require('./Order')(sequelize, Sequelize.DataTypes);
db.OrderItem = require('./OrderItems')(sequelize, Sequelize.DataTypes);

// Apply associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
