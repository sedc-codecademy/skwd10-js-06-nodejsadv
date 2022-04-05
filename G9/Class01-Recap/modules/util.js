const capitalize = str => {
  return str[0].toUpperCase() + str.slice(1);
};

class Util {
  static capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  static addExlamationMark(str) {
    return str + "!";
  }
}

//Exporting syntax
module.exports = Util;
