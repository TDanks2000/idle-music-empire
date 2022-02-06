let Json = {
  money: 0,
};

const moneyAtr = document.querySelector("[data-money]");
const clickAtr = document.querySelector("[data-click]");

document.addEventListener("DOMContentLoaded", function (event) {
  Update();
  clickAtr.addEventListener("click", (e) => {
    Json.money += 1;
    Update();
  });

  // setInterval(() => {
  //   Update();
  // }, 100);
});

const Update = () => {
  moneyAtr.innerText = Json.money;
};
