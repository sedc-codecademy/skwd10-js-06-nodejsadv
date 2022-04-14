console.log("Connected");
const results = document.getElementById("results");

const cars = [
  { carModel: "Fiat", productionDate: 2005 },
  { carModel: "Lada Niva", productionDate: 2008 },
];

cars.forEach(
  (car) =>
    (results.innerHTML += `1. Car Model: ${car.carModel}
 2. Car production Date: ${car.productionDate}`)
);
