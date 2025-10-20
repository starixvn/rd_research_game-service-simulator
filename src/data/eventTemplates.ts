export const eventTemplates = [
  {
    name: "bet",
    eventType: "bet",
    json: {
      amount: 10,
      betChoice: "under",
    },
  },
  {
    name: "inGame",
    eventType: "inGame",
    json: null,
  },
  {
    name: "getHistory",
    eventType: "getHistory",
    json: {
      page: 1,
    },
  },
  {
    name: "betNormalSpin",
    eventType: "bet",
    json: {
      betLevel: 1,
      coinValue: 0.1,
    },
  },
  {
    name: "betFreeSpin",
    eventType: "bet",
    json: {
      betLevel: 1,
      coinValue: 0.1,
      freeSpin: true,
    },
  },
  {
    name: "buyFreeSpin",
    eventType: "bet",
    json: {
      betLevel: 1,
      coinValue: 0.1,
      buyFreeSpin: 1,
    },
  },
];
export type EventTemplate = (typeof eventTemplates)[number];
