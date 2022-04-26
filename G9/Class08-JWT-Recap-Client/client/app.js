//Setting a base url variable
const BASE_URL = "http://localhost:3000";

//Selectors for the pages
const loginPageEl = document.querySelector(".login__page");
const productsPageEl = document.querySelector(".products__page");

//Selectors for the form elements
const loginBtnEl = document.querySelector(".login__btn");
const loginErrorMsgEl = document.querySelector(".login__error-msg");
const emailInputEl = document.querySelector("#email");
const passwordInputEl = document.querySelector("#password");

//Selectors for the product page elements
const welcomeHeadingEl = document.querySelector(".welcome__heading");
const productsBtnEl = document.querySelector(".products__btn");
const logoutBtnEl = document.querySelector(".logout__btn");

//Data variables
let userData = {};
let accessToken = "";
let refreshToken = "";

//Function for logging in user
const loginUser = async (email, password) => {
  const credentials = JSON.stringify({ email, password });

  const response = await fetch(BASE_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });

  console.log(response);

  const body = await response.json();

  if (response.status === 401 && !response.ok) {
    loginErrorMsgEl.innerText = body.msg;
    loginErrorMsgEl.classList.remove("hide");
    return;
  }

  userData = body.user;
  accessToken = body.token;
  refreshToken = body.refreshToken;

  loginPageEl.classList.add("hide");
  productsPageEl.classList.remove("hide");
  welcomeHeadingEl.innerText = `Welcome ${userData.firstName} ${userData.lastName}`;

  console.log(body);
};

//Login btn event listner
loginBtnEl.addEventListener("click", e => {
  e.preventDefault();
  const emailValue = emailInputEl.value;
  const passwordValue = passwordInputEl.value;

  loginUser(emailValue, passwordValue);
});

//Function for fetching products
const fetchProducts = async () => {
  const response = await fetch(BASE_URL + "/products", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 403 && !response.ok) {
    //   Here we try to get a new access token
    const body = JSON.stringify({
      refreshToken,
    });

    const refreshResponse = await fetch(BASE_URL + "/refresh-token", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (refreshResponse.status === 403 && !refreshResponse.ok) {
      //Show login form and logout user
      loginPageEl.classList.remove("hide");
      productsPageEl.classList.add("hide");
      passwordInputEl.value = "";
      loginErrorMsgEl.innerText = "Please login to continue";
      loginErrorMsgEl.classList.remove("hide");
      return;
    }

    const refreshBody = await refreshResponse.json();

    accessToken = refreshBody.token;
    fetchProducts();
    return;
  }

  const body = await response.json();

  console.log(body);
};

//Products btn event listener
productsBtnEl.addEventListener("click", e => {
  e.preventDefault();
  console.log("products btn clicked");
  fetchProducts();
});

//Function for logging out
const logoutUser = async userId => {
  await fetch(`${BASE_URL}/${userId}/logout`, {
    method: "POST",
  });
  loginPageEl.classList.remove("hide");
  productsPageEl.classList.add("hide");
  passwordInputEl.value = "";
};

//Logout btn event listener
logoutBtnEl.addEventListener("click", e => {
  e.preventDefault();

  logoutUser(userData.id);
});
