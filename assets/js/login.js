let loginBtn = document.querySelector("#login-btn");
let isPassValid = (password) => {
  return /^(?=.*\d)(?=(.*\W){2})(?=.*[a-zA-Z])(?!.*\s)/.test(password);
};
loginBtn.addEventListener("click", function () {
  alert("login is triggered");
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  if (localStorage.users !== undefined) {
    let users = JSON.parse(localStorage.getItem("users"));
    console.log(users);
    if (users.hasOwnProperty(username)) {
      alert("Yes we have something similiar");
      try {
        if (users[username]["password"] === password) {
          alert("Yes your creditionals are verified");
          localStorage.setItem("activeUser", username.toString());
          alert(localStorage["activeUser"]);
          window.location = "./dictionary-api.html";
        } else {
          alert("No,  passwords do not match");
        }
      } catch (error) {
        alert("No, passwords do not match");
      }
    }
  } else {
    alert("There is no such account");
  }
});
let signupBtn = document.querySelector("#signup-btn");
console.log(signupBtn);
signupBtn.addEventListener("click", function () {
  alert("sign up is triggered");
  let username = document.querySelector("#username1").value;
  let password = document.querySelector("#password1").value;

  try {
    let users = JSON.parse(localStorage.getItem("users"));
    alert("user object exists");
    users[username] = {};
    users[username]["password"] = password;
    users[username]["notebooks"] = [];
    console.log(isPassValid(password));
    if (isPassValid(password) === true) {
      console.log("heh");
      localStorage.setItem("users", JSON.stringify(users));
      alert("user object is setted");
    } else {
      alert("please enter a strong password");
    }
  } catch (error) {
    let users = {};
    users[username] = {};
    users[username]["password"] = password;
    users[username]["notebooks"] = [];
    if (isPassValid(password)) {
      localStorage.setItem("users", JSON.stringify(users));
    } else {
      alert("please enter a stron password");
    }
  }
});
