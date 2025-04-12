const express = require('express');
const router = express.Router();
const db = require('../models');
const authenticateJWT = require('../middleware/jwtMiddleware');

const { Order, OrderItem, CartItem, Product, Cart } = db;

router.post('/checkout', authenticateJWT, async (req, res) => {
  
    const { user_id } = req.user;
    const { shipping_address, payment_method } = req.body; 
    if (!shipping_address || !payment_method) {
      return res.status(400).json({ error: 'Shipping address and payment method are required' });
    }
    // gets all cart items associated with USER ID, checks to see if the cart is empty, if so, returns error
    try {
      const cartItems = await CartItem.findAll({ where: { user_id } });
      if (!cartItems.length) {
        return res.status(400).json({ error: 'Cart is empty' });
      }
  
    // Creates the order
      const order = await Order.create({
        user_id,
        shipping_address,
        payment_method,
        order_date: new Date()
      });
  
      let total = 0;
  
      //  Loop through cart items, calculate total and create OrderItems
      for (const item of cartItems) {
        const product = await Product.findByPk(item.product_id);
        if (!product) {
          return res.status(404).json({ error: `Product ID ${item.product_id} not found.` });
        }
  // calculation for total item price based on item quantity
        const itemTotal = item.quantity * product.price;
        total += itemTotal;
  
        await OrderItem.create({
          order_id: order.order_id,
          product_id: item.product_id,
          user_id,
          quantity: item.quantity,
          price: product.price
        });
      }
  
      // Update order with final total
      await order.update({ total_amount: total });
  
      // Clear cart items after checkout
      await CartItem.destroy({ where: { user_id } });
      // Delete the cart itself after checkout
      await Cart.destroy({ where: { user_id } });
     // return checkout message
      res.status(201).json({ message: 'Checkout successful', order_id: order.order_id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to checkout' });
    }

  });
  module.exports = router;