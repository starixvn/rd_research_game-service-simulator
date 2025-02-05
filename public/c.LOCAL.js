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
        subDomain: "l1-proxy3",
        path: "",
    },
    sentry: {
        dsn: "https://c65e9ef4f6c64d928f7b31ba355a44c2@sentry.lumigame.com/84",
        environment: "DEV",
    },
    enableSourceMap: true,
    subGuideDomain: "simulator",
    enableMsgpackParser: false,
    system: "SC",
    appType: 1,
    useTolgeeStatic: false,
    googleAnalyticId: "G-F4HZV0YQ73",
};