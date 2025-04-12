module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    cart_id: { type: DataTypes.INTEGER, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false }, 
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'cart_items',
    timestamps: false,
  });
  CartItem.associate = function(models) {
    // A CartItem belongs to ONE Cart
    CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id' });

    //A CartItem belongs to ONE Product
    CartItem.belongsTo(models.Product, { foreignKey: 'product_id' });
     // CartItem belongs to one User
     CartItem.belongsTo(models.User, { foreignKey: 'user_id' });
   
  };
  return CartItem;
};
