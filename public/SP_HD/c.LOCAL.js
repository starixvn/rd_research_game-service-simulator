window.appConfig = {
  serverDomainMapper: {
    localhost: "lumigame.com",
  },
  proxy: {
    ssl: true,
    subDomain: "hd-proxy",
    path: "",
  },
  sentry: {
    dsn: "",
    environment: "DEV",
  },
  enableSourceMap: true,
  subGuideDomain: "simulator",
  enableMsgpackParser: false,
  system: "HD",
  appType: 1,
  useTolgeeStatic: false,
  googleAnalyticId: "G-F4HZV0YQ73",
};

window.supportedGames = [
  {
    name: "Football Dice",
    namespace: "footballdice",
  },
  {
    name: "Seven Up Down",
    namespace: "sevenupdown",
  },
  {
    name: "Black Jack",
    namespace: "chineseblackjack",
  },
  {
    name: "Coin Toss",
    namespace: "cointoss",
  },
  {
    name: "Space Flight",
    namespace: "spaceflight",
  },
  {
    name: "VIP SeDie",
    path: "vsedie",
    namespace: "vipsedie",
  },
  {
    name: "SeDie",
    namespace: "sedie",
  },
  {
    name: "Mini SeDie",
    namespace: "minisedie",
  },
  {
    name: "SicBo",
    namespace: "sicbo",
  },
  {
    name: "Turbo BigSmall",
    namespace: "turbobigsmall",
  },
  {
    name: "Turbo OddEven",
    namespace: "turbooddeven",
  },
  {
    name: "Dragon Tiger",
    namespace: "dragontigerfight",
  },
  {
    name: "Fruit Slot",
    namespace: "fruitslot",
  },
  {
    name: "One Piece",
    namespace: "onepiece",
  },
  {
    name: "Unbalanced BigSmall",
    namespace: "unbalancedbigsmall",
  },
];
