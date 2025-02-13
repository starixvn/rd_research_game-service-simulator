window.appConfig = {
    serverDomainMapper: {
        localhost: "lumigame.com",
        "10.5.10.12": "lumigame.com",
        "10.5.10.35": "lumigame.com",
        "10.5.10.66": "lumigame.com",
        "10.5.10.17": "lumigame.com",
    },
    proxy: {
        ssl: true,
        subDomain: "l2-proxy1",
        path: "",
    },
    sentry: {
        dsn: "https://c65e9ef4f6c64d928f7b31ba355a44c2@sentry.lumigame.com/84",
        environment: "DEV",
    },
    enableSourceMap: true,
    subGuideDomain: "simulator",
    enableMsgpackParser: false,
    system: "VG",
    appType: 1,
    useTolgeeStatic: false,
    googleAnalyticId: "G-F4HZV0YQ73",
};

window.supportedGames = [
    {
        name: "Football Dice",
        namespace: "footballdice"
    },
    {
        name: "Seven Up Down",
        namespace: "sevenupdown"
    },
    {
        name: "Black Jack",
        namespace: "chineseblackjack"
    },
    {
        name: "Coin Toss",
        namespace: "cointoss"
    },
    {
        name: "Pusoy",
        namespace: "pusoy"
    },
    {
        name: "Marble Football",
        namespace: "marblefootball"
    },
    {
        name: "Space Flight",
        namespace: "spaceflight"
    },
    {
        name: "VIP SeDie",
        namespace: "vsedie"
    },
    {
        name: "SeDie",
        namespace: "sedie"
    },
    {
        name: "Mini SeDie",
        namespace: "minisedie"
    },
    {
        name: "SicBo",
        namespace: "sicbo"
    },
    {
        name: "Turbo BigSmall",
        namespace: "turbobigsmall"
    },
    {
        name: "Turbo OddEven",
        namespace: "turbooddeven"
    },
    {
        name: "Dragon Tiger",
        namespace: "dragontigerfight"
    },
    {
        name: "Fruit Slot",
        namespace: "fruitslot"
    },
    {
        name: "One Piece",
        namespace: "onepiece"
    },
    {
        name: "Unbalanced BigSmall",
        namespace: "unbalancedbigsmall"
    }
]