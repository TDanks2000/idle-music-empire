import { Update } from "./script.js";

const BuyUpgrade = (upgJson, Json) => {
  let Price = upgJson.price,
    Mps = upgJson.mps,
    Count = upgJson.count;

  if (Json.money < Price) return alert(`Cant afford ${upgJson.name}`);

  Json.mps += Mps;
  Json.money = Json.money - Price;
  upgJson.count += 1;
  upgJson.price = upgJson.price * 1.5;

  Update();
};

export { BuyUpgrade };
