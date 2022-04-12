const Util = require("./util");

const words = ["test", "rest", "best"];

const capitalizedWords = words.map(word => Util.capitalize(word));

const addedExclamationMarks = words.map(word => Util.addExlamationMark(word));

console.log(capitalizedWords);
console.log(addedExclamationMarks);
