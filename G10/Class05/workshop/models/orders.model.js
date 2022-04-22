const path = require("path");
const { v4: uuid } = require("uuid");

const { readFile, writeFile } = require("../utils/file-service");

class OrdersModel {
  ORDERS_PATH = path.join(__dirname, "..", "db", "orders.json");

  getOrders(id) {
    return new Promise((resolve, reject) => {
      const orders = readFile(this.ORDERS_PATH);

      if (orders.length <= 0) {
        return reject({ message: "No orders found" });
      }

      if (id) {
        const oneOrder = orders.filter((order) => order.id === id);

        if (oneOrder.length === 1) {
          return resolve({ message: "Order Found", order: oneOrder });
        } else {
          return reject({ message: "Order with that id is not found" });
        }
      }

      return resolve({ message: "Orders Found", orders: orders });
    });
  }

  addNewOrder(order) {
    return new Promise((resolve, reject) => {
      const orders = readFile(this.ORDERS_PATH);

      const orderToBeAdded = {
        id: uuid(),
        ...order,
        status: "NEW",
      };
      const newOrders = [...orders, orderToBeAdded];

      writeFile(this.ORDERS_PATH, newOrders);

      resolve({ message: "Order is added" });
    });
  }

  updateOrder(order, id) {
    return new Promise((resolve, reject) => {
      const orders = readFile(this.ORDERS_PATH);

      const newOrders = orders.map((orderOfDb) => {
        if (id === orderOfDb.id) {
          return {
            id,
            ...order,
            status: orderOfDb.status,
          };
        }
        return orderOfDb;
      });

      writeFile(this.ORDERS_PATH, newOrders);

      resolve({ message: "Order is updated" });
    });
  }

  updateOrderStatus(id, status) {
    return new Promise((resolve, reject) => {
      const orders = readFile(this.ORDERS_PATH);
      console.log(1, status);
      const newOrders = orders.map((orderOfDb) => {
        if (id === orderOfDb.id) {
          return {
            id,
            ...orderOfDb,
            status,
          };
        }
        return orderOfDb;
      });

      writeFile(this.ORDERS_PATH, newOrders);

      resolve({ message: "Order status is updated" });
    });
  }

  deleteOrder(id) {
    return new Promise((resolve, reject) => {
      const orders = readFile(this.ORDERS_PATH);

      const newOrders = orders.filter((order) => order.id !== id);

      writeFile(this.ORDERS_PATH, newOrders);

      resolve({ message: "Order is successfully deleted" });
    });
  }
}

module.exports = OrdersModel;
