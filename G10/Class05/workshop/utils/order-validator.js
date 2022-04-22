const orderValidator = (req, res, next) => {
  const dishName = req.body.dishName;
  //Check if dishName type is Array
  const isDishPerOrderArray = dishName instanceof Array;
  //Check if there are multiple dishes added as: dishName: "Chicken Soup, Beans Soup"
  //Split by ',' so we split the string to array
  //But as well we will check if isDishPerOrderArray is not array with !isDishPerOrderArray
  const splittedDishName = !isDishPerOrderArray && dishName.split(",");
  //If the length of splittedDishName is more then 1, it means that there are multiple elements
  //which leads to there were multiple dishes oredered per order
  const areThereMultipleDishesOrdered = splittedDishName.length > 1;

  if (isDishPerOrderArray) {
    return res
      .status(400)
      .send({ mesage: "Bad request, dishName can't be array" });
  }
  if (areThereMultipleDishesOrdered) {
    return res.status(400).send({
      mesage: "Bad request, you cannot order multiple dishes per order",
    });
  }
  next();
};

module.exports = { orderValidator };
