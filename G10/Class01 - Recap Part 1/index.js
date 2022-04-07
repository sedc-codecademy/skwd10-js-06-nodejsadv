class Book {
  constructor() {
    console.log(
      "Heheheh I always execute FIRST when a new instance of the class is created =)"
    );
  }

  printBookName(bookName) {
    console.log(`Book name is: ${bookName}`);
  }

  // if we have static methods, we cannot call
  // normal methods inside static
  // only static methods can be called in a static method
  static printBookAuthor(author) {
    console.log(`Author of the book is ${author} `);

    // CODE BELOW WONT WORK
    // BECAUSE WE CALL NON STATIC METHOD
    // INSIDE THIS STATIC METHOD
    // this.printBookName('Book Name')
  }
}

const bookOne = new Book();
//If we want to call a method that is not static we must call it through the instance
bookOne.printBookName("Harry Potter");

//Only static methods can be called through the class it self
Book.printBookAuthor("J.K Rowling");

class Person {
  constructor(props) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.age = props.age;
  }

  static createPerson(props) {
    // props.firstName === false
    if (!props.firstName || !props.lastName || !props.age) {
      throw new Error("Props missing or inavalid");
    } else {
      return new Person(props);
    }
  }
}
const propsForPerson = {
  firstName: "John",
  lastName: "Doe",
  age: 27,
};

const propsForPersonInvalid = {
  firstName: "Bob",
  lastName: "Bobski",
};
const personOne = Person.createPerson(propsForPerson);
console.log(personOne);

// Uncomment this lines and when run node index.js the error will be seen =)
// const personTwo = Person.createPerson(propsForPersonInvalid);
// console.log(personTwo);
