const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const PORT = 3000;

// In-memory order storage
let orders = [];

/**
 * Create Order
 */
app.post("/orders", (req, res) => {
  const { customerName, pizzaType, size, quantity } = req.body;

  if (!customerName || !pizzaType || !size || !quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const order = {
    orderId: uuidv4(),
    customerName,
    pizzaType,
    size,
    quantity,
    status: "PLACED",
    createdAt: new Date()
  };

  orders.push(order);
  res.status(201).json(order);
});

/**
 * Get All Orders
 */
app.get("/orders", (req, res) => {
  res.json(orders);
});

/**
 * Get Order by ID
 */
app.get("/orders/:id", (req, res) => {
  const order = orders.find(o => o.orderId === req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.json(order);
});

/**
 * Update Order Status
 */
app.put("/orders/:id/status", (req, res) => {
  const { status } = req.body;
  const order = orders.find(o => o.orderId === req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = status;
  res.json(order);
});

/**
 * Delete Order
 */
app.delete("/orders/:id", (req, res) => {
  orders = orders.filter(o => o.orderId !== req.params.id);
  res.json({ message: "Order deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`🍕 Pizza Order Service running on port ${PORT}`);
});
