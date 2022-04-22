const OrdersModel = require("../models/orders.model");
const om = new OrdersModel();

class OrdersController {
  getOrders(id) {
    return om.getOrders(id);
  }

  addNewOrder(order) {
    return om.addNewOrder(order);
  }

  updateOrder(order, id) {
    return om.updateOrder(order, id);
  }
  updateOrderStatus(id, status) {
    return om.updateOrderStatus(id, status);
  }

  deleteOrder(id) {
    return om.deleteOrder(id);
  }
}

module.exports = OrdersController;
