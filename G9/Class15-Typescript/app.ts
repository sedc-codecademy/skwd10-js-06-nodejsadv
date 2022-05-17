let firstName: string = "Boris";
let age: number = 30;
let isLoggedIn: boolean = true;

const users: string[] = ["Alice", "Bob", "John"];

const array: (string | number)[] = [1, "Tree"];

// let dontUseEver: any = "bad practice";

let union: string | number = 100;

union = "100";

//Enum (only exists in typescript)

enum OrderStatus {
  New = "new",
  Cancelled = "cancelled",
  Completed = "completed",
}

console.log(OrderStatus.New);
console.log(OrderStatus.Cancelled);

//Objects

type Dish = {
  id: number;
  title: string;
  price: number;
};

const dishOne: Dish = {
  id: 1,
  title: "Pasta",
  price: 40,
};

const dishTwo: Dish = {
  id: 2,
  title: "Steak",
  price: 300,
};

//Functions

const createFullName = (firstName: string, lastName: string): string => {
  console.log(`${firstName} ${lastName}`);
  return `${firstName} ${lastName}`;
};

//Interfaces

interface OrderModel {
  id: string;
  dishName: string;
  status: OrderStatus;
  user?: string;
}

const orderOne: OrderModel = {
  id: "3",
  dishName: "Pasta",
  status: OrderStatus.New,
};

class Order {
  private readonly id: string;
  private status = OrderStatus.New;
  private dishName: string;

  constructor(id: string, dishName: string) {
    this.id = id;
    this.dishName = dishName;
  }

  logDishName() {
    console.log(this.dishName);
  }
}

const orderTwo = new Order("4", "Salad");

// console.log(orderTwo.dishName);
orderTwo.logDishName();
