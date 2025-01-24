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
    }

];
export type EventTemplate = typeof eventTemplates[number];