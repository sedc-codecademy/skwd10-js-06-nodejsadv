//PROMISES

/**
 * What is a promise?
 *
 * The promise is object that has the value of a completition of an asyncrounous operation.
 *
 * Promise has 3 states:
 *  - pending => the initial state,
 *  - fullfilled => meaning the operation has finished successfully,
 *  - rejected => meaning the operation has failed, and of course it failed with a reason ;)
 */

// const personOne = {
//     age: 18
// }

function canPersonGoToDisco(person) {
  return new Promise((resolve, reject) => {
    if (person.age >= 18) {
      resolve({
        message: "Yes person is adult and can enter disco =)",
      });
    } else {
      reject({
        message: "Nope, person is not an adult, and may not enter disco =)",
      });
    }
  });
}

const personOne = canPersonGoToDisco({ age: 27 });
// console.log(personOne);

// Syntax #1
const resolvedPersonOne = personOne
  .then((result) => {
    console.log(result.message);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("I will execute no matter what!");
  });

// Syntax #2
const personTwo = canPersonGoToDisco({ age: 15 })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

// ASYNC/AWAIT
// ASYNC/AWAIT is a syntatic sugar of handling promises =)

// It is a fancy way of resolving a promise

// const checkUser = async (ageNumber) => {

// }

async function checkUser(ageNumber) {
  try {
    const userOne = await canPersonGoToDisco({ age: ageNumber });
    console.log("INSIDE CHECK USER", userOne);
  } catch (error) {
    console.log("INSIDE CATCH ERROR IN CHECK USER", error);
  }
}
checkUser(30);

checkUser(10);

//So we know how promises work, but when are we going to use them?

const ourUsersDB = [
  { id: 1, fullName: "Bob Bobski" },
  { id: 2, fullName: "John Doe" },
  { id: 3, fullName: "Ana Han" },
];

const readFromDB = (id, database) => {
  return new Promise((resolve, reject) => {
    // Here are READING from a DB
    // IT MAY TAKE SOME TIME

    // This read to the DB might take 500ms
    const userFromDB = database.find((user) => user.id === id);

    if (userFromDB) {
      resolve({
        message: "User found",
        userFound: userFromDB,
      });
    } else {
      reject({
        message: "User is not found",
      });
    }
  });
};

const dummyUserOne = readFromDB(3, ourUsersDB)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log("Error", error);
  });

console.log("HEHEHE I AM AT THE END OF THE CODE");
