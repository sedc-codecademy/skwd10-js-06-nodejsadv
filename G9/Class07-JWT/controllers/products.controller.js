const ProductModel = require("../models/products.model");

class ProductController {
  static async fetchProducts(req, res) {
    try {
      console.log(req.cookies);

      const queryData = req.query;
      console.log(queryData);

      const products = await ProductModel.getProducts(queryData);
      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}

module.exports = ProductController;
