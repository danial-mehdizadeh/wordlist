class Card {
  constructor(id, content) {
    this.id = id;
    this.content = content;
    this.article = document.createElement("article");
    this.article.classList = "shadow p-3 mb-5 bg-body rounded";
    this.searchInput = document.createElement("input");
    this.applyButton = document.createElement("input");
    this.applyButton.type = "button";
    this.applyButton.value = "search";
    this.settingButton1 = document.createElement("input");
    this.settingButton1.type = "button";
    // this.settingButton1.value = "Free Dictionary";
    // this.settingButton2 = document.createElement("input");
    // this.settingButton2.type = "button";
    // this.settingButton2.value = "Merriam Webster";
    // this.settingButton3 = document.createElement("input");
    // this.settingButton3.type = "button";
    // this.settingButton3.value = "Wictionary";
    this.resultDiv = document.createElement("div");
    this.resultDiv.class = "resultDiv";
    this.resultPar = document.createElement("p");
    this.resultTitle = document.createElement("h3");
    this.resultTitle.innerText = "Result";
    this.resultPar.innerText = content;
  }
  makeCard(parentElement) {
    parentElement.append(this.article);
    this.article.append(
      this.searchInput,
      this.applyButton
      // this.settingButton1
      // this.settingButton2,
      // this.settingButton3
    );
    this.article.append(this.resultDiv);
    this.resultDiv.append(this.resultTitle, this.resultPar);
    // const settings = [
    //   [this.settingButton1, true],
    // [this.settingButton2, true],
    // [this.settingButton3, true],
    // ];
    // for (let i = 0; i < settings.length; i++) {
    //   settings[i][0].addEventListener("click", () => {
    //     let mine = settings[i][0]

    //   });
    // }
    let articleElements = [this.article, ...this.article.childNodes];
    // console.log(articleElements)
    for (let i = 0; i < articleElements.length; i++) {
      articleElements[i].id = `ca-card-${this.id}-${i}`;
    }
  }
}
let counter = 0;
let cardList = [];
let dicCard = function (parentElement, data) {
  if (counter < 10) {
    const card = new Card(counter, "test");
    cardList.push(card);
    cardList[counter].makeCard(parentElement);
    counter++;
    // console.log(cardList);
  }
  // data injection
  let cardIndex = cardList.length - 1;

  let cardId = "ca-card-" + cardIndex + "-3";
  let cardDiv = document.getElementById(cardId);
  cardDiv.innerText = "";
  // console.log(data);
  for (field of data) {
    let h3 = document.createElement("h3");
    h3.innerHTML = field.word;
    let phonetics = document.createElement("span");
    try {
      phonetics.innerText = field.phonetic;
    } catch (err) {}
    if (field.phonetic === undefined) {
      phonetics.innerText = "";
    }

    console.log(field);
    cardDiv.append(h3, phonetics);
    for (meaning of field.meanings) {
      meaning.definitions.forEach((element) => {
        let defPar = document.createElement("p");
        console.log(element);
        defPar.innerText =
          element.definition !== undefined ? element.definition : "";
        cardDiv.append(defPar);
      });
    }
  }
};
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
