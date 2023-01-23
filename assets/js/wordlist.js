document.querySelector("#printoutput").onclick = function () {
  var printwin = window.open("");
  printwin.document.write(document.getElementById("dic-element").innerHTML);
  printwin.print();
};
window.alert("you are logged in as: " + localStorage.getItem("activeUser"));
let guestNotebook = JSON.parse(localStorage.getItem("guestNotebooks"));
document.querySelector("#show-wordlists-guest").onclick = () => {
  document.querySelector("#show-wordlists-guest").disabled = true;
  document.querySelector("#show-wordlists-user").disabled = "";
  document.querySelector("#content").innerHTML = "";

  if (guestNotebook !== null) {
    for (element of guestNotebook) {
      console.log(element);
      let newarticle = document.createElement("article");
      newarticle.innerHTML = element;

      document.querySelector("#content").append(newarticle);
    }
  }
};
document.querySelector("#show-wordlists-user").onclick = () => {
  if (localStorage["activeUser"] === "guest") {
    alert("Please log in to your account first");
    window.location = "./account.html";
  } else {
    let userNotebook = localStorage.getItem("users");
    userNotebook = JSON.parse(userNotebook);
    let userNotebooks = userNotebook[localStorage["activeUser"]].notebooks;
    document.querySelector("#show-wordlists-user").disabled = true;
    document.querySelector("#show-wordlists-guest").disabled = "";
    document.querySelector("#content").innerHTML = "";
    console.log(userNotebooks);
    if (userNotebooks !== null) {
      for (element of userNotebooks) {
        console.log(element);
        let newarticle = document.createElement("article");
        newarticle.innerHTML = element;
        document.querySelector("#content").append(newarticle);
      }
    }
  }
};
