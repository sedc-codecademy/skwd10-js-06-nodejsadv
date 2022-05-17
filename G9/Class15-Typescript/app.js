var firstName = "Boris";
var age = 30;
var isLoggedIn = true;
var users = ["Alice", "Bob", "John"];
var array = [1, "Tree"];
// let dontUseEver: any = "bad practice";
var union = 100;
union = "100";
//Enum (only exists in typescript)
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["New"] = "new";
    OrderStatus["Cancelled"] = "cancelled";
    OrderStatus["Completed"] = "completed";
})(OrderStatus || (OrderStatus = {}));
console.log(OrderStatus.New);
console.log(OrderStatus.Cancelled);
var dishOne = {
    id: 1,
    title: "Pasta",
    price: 40
};
var dishTwo = {
    id: 2,
    title: "Steak",
    price: 300
};
//Functions
var createFullName = function (firstName, lastName) {
    console.log("".concat(firstName, " ").concat(lastName));
    return "".concat(firstName, " ").concat(lastName);
};
var orderOne = {
    id: "3",
    dishName: "Pasta",
    status: OrderStatus.New
};
var Order = /** @class */ (function () {
    function Order(id, dishName) {
        this.status = OrderStatus.New;
        this.id = id;
        this.dishName = dishName;
    }
    Order.prototype.logDishName = function () {
        console.log(this.dishName);
    };
    return Order;
}());
var orderTwo = new Order("4", "Salad");
// console.log(orderTwo.dishName);
orderTwo.logDishName();
