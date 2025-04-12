module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category_name: { type: DataTypes.STRING(1005), allowNull: false },
  }, {
    tableName: 'product_category',
    timestamps: false
  });

  // Define associations for ProductCategory
  ProductCategory.associate = function(models) {
    ProductCategory.hasMany(models.Product, { foreignKey: 'category_id' });
  };

  return ProductCategory;
};
