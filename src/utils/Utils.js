const SetTitle = (Json) => {
  document.title = `Idle music Empire [${Math.floor(Json.money * 100) / 100}]`;
};

export { SetTitle };
