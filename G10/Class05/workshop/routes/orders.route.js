const router = require("express").Router();
const OrdersController = require("../controllers/orders.controller");
const oc = new OrdersController();

const {
  validateAuthenticatedSession,
  validateIsAdminSession,
} = require("../utils/session-validator");

const { orderValidator } = require("../utils/order-validator");

router.get("/:id?", validateIsAdminSession, async (req, res) => {
  const id = req.params.id;

  try {
    const orders = await oc.getOrders(id);
    res.send(orders);
  } catch (error) {
    res.send(error);
  }
});

router.post(
  "/",
  orderValidator,
  validateAuthenticatedSession,
  async (req, res) => {
    const orderToAdd = req.body;

    try {
      const orders = await oc.addNewOrder(orderToAdd);
      res.send(orders);
    } catch (error) {
      res.send(error);
    }
  }
);

router.patch("/:id", validateIsAdminSession, async (req, res) => {
  const order = req.body;
  const id = req.params.id;

  try {
    const orders = await oc.updateOrder(order, id);
    res.send(orders);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id/:status", validateIsAdminSession, async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;

  try {
    const orders = await oc.updateOrderStatus(id, status);
    res.send(orders);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", validateIsAdminSession, async (req, res) => {
  const id = req.params.id;
  try {
    const orders = await oc.deleteOrder(id);
    res.send(orders);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
