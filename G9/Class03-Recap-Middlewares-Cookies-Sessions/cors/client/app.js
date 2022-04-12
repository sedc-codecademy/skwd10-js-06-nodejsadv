const dataBtn = document.querySelector(".data__btn");

const fetchData = async () => {
  const response = await fetch("http://localhost:3000");
  const data = await response.json();
  console.log(data);
};

dataBtn.addEventListener("click", () => {
  fetchData();
});
