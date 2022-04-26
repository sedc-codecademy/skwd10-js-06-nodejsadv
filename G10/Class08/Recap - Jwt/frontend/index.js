const username = document.getElementById("username");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const productsBtn = document.getElementById("productsBtn");

let accessToken = null;
let refreshToken = null;

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const credentials = {
    username: username.value,
    password: password.value
  }

  const loginResponse = await fetch("http://localhost:3000/login", {
    method: 'POST',
    body: JSON.stringify(credentials), 
    headers: {
      "Content-Type": "application/json"
    }
  })

  console.log(loginResponse)

  const data = await loginResponse.json()
  console.log(data)
  accessToken = data.accessToken
  refreshToken = data.refreshToken
})

const getProducts = async () => {

  const productsResponse = await fetch("http://localhost:3000/products", {
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken
    }
  })

  console.log('Products RESPONSE', productsResponse);

  const productsData = await productsResponse.json();

  console.log("PRODUCTS DATA: ", productsData )

  if(productsResponse.status === 403){
    // And now, here we will TRIGGER THE /refresh_token
    console.log("The access token expired, and we will ASK for new one")

    const refreshBody = {
      refreshToken: refreshToken
    }

    const refreshResponse = await fetch("http://localhost:3000/refresh_token", {
      method: "POST",
      body: JSON.stringify(refreshBody),
      headers: {
        "Content-Type": "application/json"
      }

    })


    if(refreshResponse.ok){
      const refreshData = await refreshResponse.json();
      console.log("REFRESH TOKEN", refreshData)
      accessToken = refreshData.accessToken
      getProducts()
    }
  }
}

productsBtn.addEventListener("click", () => {
  getProducts()
})