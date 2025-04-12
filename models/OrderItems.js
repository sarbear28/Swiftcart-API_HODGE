module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    order_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false }, 
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.NUMERIC(10,2), allowNull: false }
  }, {
    tableName: 'order_items',
    timestamps: false
  });

  // Define associations for orderItems
  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, { foreignKey: 'order_id' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'product_id' });
    OrderItem.belongsTo(models.User, { foreignKey: 'user_id' }); // 
  };

  return OrderItem;
};
