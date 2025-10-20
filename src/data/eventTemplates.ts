export const eventTemplates = [
  {
    name: "bet",
    json: {
      amount: 10,
      betChoice: "under",
    },
  },
  {
    name: "inGame",
    json: null,
  },
  {
    name: "getHistory",
    json: {
      page: 1,
    },
  },
  {
    name: "slotNormalSpin",
    json: {
      betLevel: 1,
      coinValue: 0.1,
    },
  },
  {
    name: "slotFreeSpin",
    json: {
      betLevel: 1,
      coinValue: 0.1,
      freeSpin: true,
    },
  },
  {
    name: "buyFreeSpin",
    json: {
      betLevel: 1,
      coinValue: 0.1,
      buyFreeSpin: 1,
    },
  },
];
export type EventTemplate = (typeof eventTemplates)[number];
