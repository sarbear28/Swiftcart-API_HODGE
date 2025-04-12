const express = require('express');
const db = require('../models');
const router = express.Router();
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  const { search, category_id, minPrice, maxPrice } = req.query;

  const whereClause = {};

  // Search by name or description
  if (search) {
    whereClause[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } }
    ];
  }

  // Filter by category
  if (category_id) {
    whereClause.category_id = category_id;
  }

  // Filter by price range
  if (minPrice || maxPrice) {
    whereClause.price = {};
    if (minPrice) {
      whereClause.price[Op.gte] = parseFloat(minPrice);
    }
    if (maxPrice) {
      whereClause.price[Op.lte] = parseFloat(maxPrice);
    }
  }

  try {
    const products = await db.Product.findAll({
      where: whereClause,
      include: [{ model: db.ProductCategory, attributes: ['category_name'] }]
    });

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});
module.exports = router;
