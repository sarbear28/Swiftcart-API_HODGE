module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.NUMERIC(10,2), allowNull: false },
    stock_quantity: { type: DataTypes.INTEGER, allowNull: false },
    image_url: { type: DataTypes.STRING(500) },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'products',
    timestamps: false,
    freezeTableName: true 
  });

  Product.associate = function(models) {
    // a product belongs to a category 
    Product.belongsTo(models.ProductCategory, { foreignKey: 'category_id' });
    // a product has many CartItems
    Product.hasMany(models.CartItem, { foreignKey: 'product_id' });
    // a product can have many OrderItems
    Product.hasMany(models.OrderItem, { foreignKey: 'product_id' });
  };

  return Product;
};
