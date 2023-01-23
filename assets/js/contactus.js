document.getElementById("send").onclick = function () {
  freedictionary(document.getElementById("dic-query").value);
};
document.getElementById("dic-query").onkeypress = function (e) {
  if (e.keyCode === 13) {
    freedictionary(document.getElementById("dic-query").value);
  }
};
let freedictionary = async function (query) {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
  );
  const data = await res.json();
  dicCard(document.querySelector("#content"), data);
  // console.log(data);
};
document.querySelector("#printoutput").onclick = function () {
  var printwin = window.open("");
  printwin.document.write(document.getElementById("dic-element").innerHTML);
  printwin.print();
};
document.querySelector("#saveit").addEventListener("click", function () {
  if (localStorage["activeUser"] !== undefined) {
    alert(localStorage["activeUser"]);
  } else {
    localStorage["activeUser"] = "guest";
    localStorage["guestNotebooks"] = "[]";
    console.log(localStorage["guestNotebooks"]);
  }
  if (localStorage["activeUser"] === "guest") {
    console.log(localStorage["guestNotebooks"]);
    let guestNotebooks = [...JSON.parse(localStorage["guestNotebooks"])];
    guestNotebooks.push(document.querySelector("#content").innerHTML);
    localStorage["guestNotebooks"] = JSON.stringify(guestNotebooks);

    alert("success");
  } else {
    console.log(localStorage["users"]["activeUser"]);
    let userNotebooks = JSON.parse(localStorage.getItem("users"));
    console.log(userNotebooks[localStorage.getItem("activeUser")]["notebooks"]);

    userNotebooks[localStorage.getItem("activeUser")]["notebooks"].push(
      document.querySelector("#content").innerHTML
    );
    localStorage.setItem("users", JSON.stringify(userNotebooks));
    console.log(localStorage.getItem("users"));
    alert("success");
  }
  // else{
  //   let guestNotebooks = JSON.parse(localStorage[activeUser]["notebooks"])
  //   guestNotebooks.push(document.querySelector(#dic-element))
  //   localStorage["guestNotebooks"] = JSON.stringify(guestNotebooks)
  //   alert('success')
  //   console.log(localStorage[activeUser]["notebooks"])
  // }
  // localStorage["activeUser"]["notebooks"];
});
