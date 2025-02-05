export const eventTemplates = [
    {
        name:"bet",
        json: {
            amount: 10,
            betChoice: "under"
        }
    },
    {
        name:"inGame",
        json: null
    },
    {
        name: "getHistory",
        json: {
            "page":1
        }
    }
];
export type EventTemplate = typeof eventTemplates[number];