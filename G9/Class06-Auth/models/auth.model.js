const DataService = require("../services/data.service");
const path = require("path");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");

const usersPath = path.join(__dirname, "..", "data", "users.json");

//Creating a user class
class User {
  constructor(firstName, lastName, age, email, password) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.password = password;
  }
}

class AuthModel {
  static async getAllUsers() {
    return DataService.readJSONFile(usersPath);
  }

  // 1. Create a user
  static async createUser(userData) {
    //We check if the user exists first
    const users = await this.getAllUsers();
    const userExists = users.some(user => user.email === userData.email);
    if (userExists) return Promise.reject({ msg: "Email Already Taken" });

    //Hashing user password
    const hashedPassword = await bcrypt.hash(userData.password, 8);
    console.log(hashedPassword);

    //Creating a new instance of the user class with the data
    const newUser = new User(
      userData.firstName,
      userData.lastName,
      userData.age,
      userData.email,
      hashedPassword
    );
    console.log("THis is the new user object");
    console.log(newUser);
    //Updating user array
    const updatedUsers = [...users, newUser];
    //Saving the users to db
    await DataService.saveJSONFile(usersPath, updatedUsers);
    //Removing hashed password before sending user data to client
    const { password, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }
  // 2. Login a user
  static async loginUser(credentials) {
    //Destructuring the credentials
    const { email, password } = credentials;
    //Getting the users
    const users = await this.getAllUsers();
    //Checking if user exists
    const foundUser = users.find(user => user.email === email);
    if (!foundUser) return Promise.reject({ msg: "Invalid Credentials" });
    //Checking if the password if valid
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) return Promise.reject({ msg: "Invalid Credentials" });
    //Removing hashed password from user object
    const { password: hashedPassword, ...userWithoutPassword } = foundUser;

    return userWithoutPassword;
  }
}

module.exports = AuthModel;
