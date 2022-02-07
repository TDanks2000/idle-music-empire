import { GetStorage, SetStorage, DelStorage } from "./ls.js";
import { BuyUpgrade } from "./Upgrades.js";
import { SetTitle } from "./utils/Utils.js";

let Json = {
  money: 0,
  mps: 0,
  Upgrades: {
    equipment: {
      name: "Upgrade Equipment",
      price: 25,
      mps: 0.1,
      count: 0,
      id: "upgradeEquipment",
    },
    releaseSong: {
      name: "Release a song",
      price: 50,
      mps: 0.5,
      count: 0,
      id: "releaseSong",
    },
    releaseAlbum: {
      name: "Release a Album",
      price: 200,
      mps: 2,
      count: 0,
      id: "releaseAlbum",
    },
  },
};

const moneyAtr = document.querySelector("[data-money]"),
  mpsAtr = document.querySelector("[data-mps]"),
  clickAtr = document.querySelector("[data-click]");

const UpgEquipmentSelect = document.querySelector("#upgradeEquipment");

const saveAtr = document.querySelector("[data-save]"),
  loadAtr = document.querySelector("[data-load]"),
  resetAtr = document.querySelector("[data-reset]");

document.addEventListener("DOMContentLoaded", function (event) {
  onStart();

  clickAtr.addEventListener("click", (e) => {
    Json.money += 1;
    Update();
  });

  saveAtr.addEventListener("click", async (e) => {
    SetStorage("saveGame", Json, true);
    saveAtr.style.pointerEvents = "none";
    saveAtr.innerText = "saved";
    setTimeout(() => {
      saveAtr.innerText = "save";
      saveAtr.style.pointerEvents = "initial";
    }, 1000);
  });

  resetAtr.addEventListener("click", (e) => {
    if (confirm("Are you sure you want to reset your save")) {
      DelStorage("saveGame");
      window.location.reload();
    }
  });

  // setInterval(() => {
  //   Update();
  // }, 100);

  //save game every 5 minutes
  setInterval(() => {
    SetStorage("saveGame", Json, true);
    saveAtr.style.pointerEvents = "none";
    saveAtr.innerText = "saved";
    setTimeout(() => {
      saveAtr.innerText = "save";
      saveAtr.style.pointerEvents = "initial";
    }, 1000);
  }, 5 * 60 * 1000);
});

setInterval(() => {
  Json.money += Json.mps;
  Update();
}, 1000);

const Update = () => {
  SetTitle(Json);

  moneyAtr.innerText = Math.floor(Json.money * 100) / 100;
  mpsAtr.innerText = Math.floor(Json.mps * 100) / 100;

  Object.values(Json.Upgrades).forEach((upg) => {
    const Select = document.getElementById(upg.id),
      Price = Select.querySelector("[data-price]"),
      Count = Select.querySelector("[data-count]"),
      UMps = Select.querySelector("[data-uMps]");

    Price.innerText = upg.price;
    Count.innerText = upg.count;
    UMps.innerText = upg.count * upg.mps;
  });
};

const onStart = async () => {
  SetTitle(Json);
  const GameStorage = GetStorage("saveGame", true) || Json;
  Json = await GameStorage;

  Object.values(Json.Upgrades).forEach((upg) => {
    const Select = document.getElementById(upg.id);

    Select.addEventListener("click", (e) => {
      BuyUpgrade(upg, Json);
    });
  });

  Update();
};

export { onStart, Update };
