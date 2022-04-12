const person = {
  firstName: "John",
  lastName: "Doe",
  age: 33,
};

console.log(person);

const personCopy = { ...person };
const personCopyTwo = person;

personCopyTwo.firstName = "Test";
personCopy.firstName = "Real Copy";

console.log(person);
console.log(personCopyTwo);

console.log(personCopy);

// const firstName = person.firstName
// const lastName = person.lastName

const { lastName, firstName, age } = person;

// console.log(personName, personSurname);
console.log(firstName, lastName, age);

const personUpdates = {
  firstName: "Jane",
  age: 40,
};

//When destructuring multiple objects, the object that's to the right if it has identical properties to the ones on
//the left will overwrite the values and those will be used.
const updatedPerson = {
  ...person,
  ...personUpdates,
  country: "Macedonia",
  country: "USA",
};

console.log(updatedPerson);

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const numbersTwo = [11, 12, 13, 14];

console.log(numbers);

//Array elements are not overwritten but are added to either the end or the beggining
const updatedNumbers = [...numbers, ...numbersTwo];

console.log(updatedNumbers);

const [one, two, three, , , , five, ...rest] = updatedNumbers;

console.log(one, two, three, five);
console.log(rest);

//Reducers

//Simple example
const sum = numbers.reduce((acc, el) => {
  console.log(el);
  console.log(acc);
  return acc + el;
}, 0);

console.log(sum);

const evenOddsCounter = numbers.reduce(
  (acc, el) => {
    if (el % 2 === 0) {
      acc.evens++;
    } else {
      acc.odds++;
    }
    return acc;
  },
  { evens: 0, odds: 0 }
);

console.log(evenOddsCounter);

const evenOddsArrays = numbers.reduce(
  (acc, el) => {
    if (el % 2 === 0) {
      acc.evens.push(el);
    } else {
      acc.odds.push(el);
    }
    return acc;
  },
  { evens: [], odds: [] }
);

console.log(evenOddsArrays);
