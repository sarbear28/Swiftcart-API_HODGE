const express = require('express');
const authenticateJWT = require('../middleware/jwtMiddleware');
const db = require('../models');

const router = express.Router();

// POST - Add product to cart with duplicate check
router.post('/', authenticateJWT, async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.user_id;

  console.log('Request Body:', req.body);
  console.log('Decoded User ID:', user_id);

  try {
    if (!product_id || !quantity) {
      return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    // Find or create the user's cart
    let cart = await db.Cart.findOne({ where: { user_id } });
    if (!cart) {
      cart = await db.Cart.create({ user_id });
    }

    console.log('Cart ID:', cart.cart_id);

    // Check if item already exists in cart
    const existingItem = await db.CartItem.findOne({
      where: {
        cart_id: cart.cart_id,
        product_id: parseInt(product_id) // compared as integer
      }
    });
  //If the item exists i nthe cart, return 400 error and log the error in console
    if (existingItem) {
      console.log('Product already in cart!');
      return res.status(400).json({ error: 'Product already exists in cart' });
    }
    // before creating the cart item, check if the product actually exists
    const product = await db.Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    //  Add product to cart
    const cartItem = await db.CartItem.create({
      cart_id: cart.cart_id,
      product_id,
      user_id,
      quantity
    });
/// log success in console, log error in console
    console.log(' Product added to cart:', cartItem.toJSON());
    res.status(201).json(cartItem);
  } catch (error) {
    console.error(' Error adding product to cart:', error);
    res.status(500).json({ error: 'Error adding product to cart' });
  }
});



// DELETE - Remove product from cart
router.delete('/:productId', authenticateJWT, async (req, res) => {
  const { productId } = req.params;
  const user_id = req.user.user_id; 
// if product_id is invalid (not in DB), return error to user
  if (isNaN(productId)) {
    return res.status(400).json({ error: 'Invalid product ID format' });
  }
  

  console.log('Request to delete product:', productId);
  console.log('Authenticated user_id:', user_id);

  try {
    // Find user's cart
    const cart = await db.Cart.findOne({ where: { user_id } });
    if (!cart) {
      console.log('Cart not found for user');
      return res.status(404).json({ error: 'Cart not found for user' });
    }
//log found cart in console
    console.log('Found cart:', cart.cart_id);

    // Find the cart item using cart_id and product_id
    const cartItem = await db.CartItem.findOne({
      where: { cart_id: cart.cart_id, product_id: productId }
    });
    // check to see if that item is actually in the cart
    if (!cartItem) {
      console.log('Cart item not found');
      return res.status(404).json({ error: 'Cart item not found or not owned by the user' });
    }
// log removing item in console
    console.log('Cart item found, removing...');
    await cartItem.destroy();
//return success message to user 
    res.status(200).json({ message: 'Cart item removed successfully' });
//return error message to user and log in console
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ error: 'Error removing product from cart' });
  }
});

module.exports = router; 
