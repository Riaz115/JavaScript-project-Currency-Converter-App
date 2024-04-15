const Base_Url =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
// const ACCESS_KEY = "662b7fb2370bc4760b3ef5d1";
const selects = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of selects) {
  for (currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    newOption.style.backgroundColor = "black";
    newOption.style.color = "white";
    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    changeflag(evt.target);
  });
}

const changeflag = (element) => {
  let currcode = element.value;
  let cntryval = countryList[currcode];
  let newSrc = `https://flagsapi.com/${cntryval}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updatexhangerate = async () => {
  let amount = document.querySelector("form input");
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amount.value = "1";
    amtval = 1;
  }

  const URL = `${Base_Url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
  // const URL = `https://api.currencylayer.com/live?access_key=${ACCESS_KEY}&currencies=${fromcurr.value},${tocurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[tocurr.value.toLowerCase()];
  let finalval = amtval * rate;
  msg.innerText = `${amtval}${fromcurr.value} = ${finalval}${tocurr.value}`;
};

window.addEventListener("load", () => {
  updatexhangerate();
});

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updatexhangerate();
});
