module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING(255), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(150), allowNull: false},
    first_name: { type: DataTypes.STRING(50), allowNull: false },
    last_name: { type: DataTypes.STRING(50), allowNull: false },
    address: { type: DataTypes.STRING(244), allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, { 
    tableName: 'users',
    timestamps: false
  });

  // Associations for user model
  User.associate = function(models) {
    User.hasMany(models.Order, { foreignKey: 'user_id' });
    User.hasOne(models.Cart, { foreignKey: 'user_id' });
    // One-to-many relationship with CartItems
    User.hasMany(models.CartItem, { foreignKey: 'user_id' });
     // One-to-many relationship with OrderItems
     User.hasMany(models.OrderItem, { foreignKey: 'user_id' });
  };

  return User;
};
