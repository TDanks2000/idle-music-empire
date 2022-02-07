const GetStorage = (toGet, isBase64) => {
  const gotItem = localStorage.getItem(toGet);
  if (!gotItem) return false;
  return JSON.parse(atob(gotItem));
};

const SetStorage = (name, toSet, wantConvert) => {
  if (!wantConvert) return localStorage.setItem(name, JSON.stringify(toSet));

  return localStorage.setItem(name, btoa(JSON.stringify(toSet)));
};

const DelStorage = (name) => {
  return localStorage.removeItem(name);
};

export { GetStorage, SetStorage, DelStorage };
