let number: number = 5;
let firstName: string = "Goce";
let isAdult : boolean = true;
let something : any = 10;

// ARRAYS

let firstNames: string[] = ["Goce", "Ivan"]
let arrayOfSomething: any[] = [10, "Goce", true];


// UNIONS

let message: number | string = 10;
message = "10"


//Tuples

let array: [number, string] = [10, "Goce"]
let array1: [number, string][] = [
    [10, "Goce"],
    [20, "Kabov"]
]

// Functions

let sumTwoNumbers = (x: number, y: number) : number => x + y;
let sayHi = (name: string | number) : void => console.log("Hi there" + name);


// Objects

type User = {
    id: string,
    firstName: string
}

let user: User = {
    id: "123123",
    firstName: "Goce"
}


// Interfaces

interface UserInterface {
    id : string,
    firstName: string,
    sayHi: () => void
}

// const user1 : UserInterface = {
//     id: "123123",
//     firstName: "Goce",
//     sayHi() {
//         console.log("Hi there")
//     }
// }

// console.log(user1.id) => throws error if we want to update the value and its readonly



// Classes

class Users implements UserInterface {
    id: string
    firstName: string;
    constructor(id: string, firstName: string) {
        this.id = id;
        this.firstName = firstName;
    }


    sayHi(){ console.log("HI THERE") }
}

let userInstance = new Users("123123", "Goce");
// userInstance.id = "asdasdasdasd";


interface OurFunction {
    (num1: number, num2:number): number
}


let sumNumbers : OurFunction = (x: number, y: number) => x + y
// let syHello : OurFunction = (message: string) => console.log(message);

// let sumNumbers1 = (x: number, y: number) => x + y;

let createArray = <T>(items: T[]) => [...items]

let arrayString = createArray<string>(["Goce", "Ivan"])
let numberArray = createArray<number>([10, 20])
let boolArray = createArray<boolean>([true, false]);
// boolArray.push(12);
