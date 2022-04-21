const DataService = require("../services/data.service");

const path = require("path");

const productsPath = path.join(__dirname, "..", "data", "products.json");

class ProductModel {
  static async getProducts(queryData) {
    const products = await DataService.readJSONFile(productsPath);

    if (queryData?.category) {
      return products.filter(
        product => product.category === queryData.category
      );
    }

    return products;
  }
}

module.exports = ProductModel;
