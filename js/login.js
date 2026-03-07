const demoCredentials = {
  username: "admin",
  password: "admin123",
};
const userNameInput = document.getElementById("user-name-input");
const userPassInput = document.getElementById("user-pass-input");
const userSignInBtn = document.getElementById("user-signin-btn");

function handleLogin() {
  const nameVal = userNameInput.value.trim();
  const passVal = userPassInput.value.trim();

  if (!nameVal || !passVal) {
    alert("Fill all the fields to procced");
    return;
  }
  if (
    nameVal === demoCredentials.username &&
    passVal === demoCredentials.password
  ) {
    alert("login successfull");
    window.location.assign(("../app.html"))
    // window.location.replace(("../app.html"))
  } else {
    alert("login failed");
  }
}

userSignInBtn.addEventListener("click", handleLogin);
