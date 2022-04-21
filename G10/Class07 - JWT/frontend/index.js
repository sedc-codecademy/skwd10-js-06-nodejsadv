const statusMsg = document.getElementById("statusMsg");
const username = document.getElementById("username");
const password = document.getElementById("password");
const myBtn = document.getElementById("myBtn");
const getProductsBTN = document.getElementById("getProducts");

let accessToken = null;
let refreshToken = null;

myBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const values = {
    username: username.value,
    password: password.value,
  };
  console.log(values);
  const loginResponse = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await loginResponse.json();
  console.log(data);
  accessToken = data.accessToken;
  refreshToken = data.refreshToken;
  statusMsg.innerText = data.message;
});

const getProducts = async () => {
  const response = await fetch("http://localhost:3000/api/products", {
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  });

  if (response.status === 403) {
    console.log("Your token expired");
    console.log(refreshToken);
    const refreshResponse = await fetch(
      "http://localhost:3000/api/auth/refresh_token",
      {
        method: "POST",
        body: JSON.stringify({ refreshToken: refreshToken }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (refreshResponse.ok) {
      console.log("Refresh token created a brand new access token");
      const data = await refreshResponse.json();
      accessToken = data.accessToken;
      statusMsg.innerText = data.message;
      console.log("Refetch products");
      getProducts();
    }
  }

  const products = await response.json();
  console.log(products);
};

getProductsBTN.addEventListener("click", () => {
  getProducts();
});
