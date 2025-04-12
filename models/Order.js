module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      total_amount: { type: DataTypes.NUMERIC(10,2), allowNull: false, defaultValue: 0.00 },
      status: { type: DataTypes.STRING(50), allowNull: false, defaultValue: 'pending' },
      shipping_address: { type:DataTypes.STRING(255), allowNull: false },
      order_date: {type:DataTypes.DATE, allowNull: false}, 
      payment_method: {type:DataTypes.STRING(50), allowNull: false},
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, {
      tableName: 'orders',
      timestamps: false,
    });

    Order.associate = function(models) {
      // An Order belongs to ONE User
      Order.belongsTo(models.User, { foreignKey: 'user_id' });
  
      // An Order has many OrderItems
      Order.hasMany(models.OrderItem, { foreignKey: 'order_id' });
     
    };
  
    return Order;
  };
  