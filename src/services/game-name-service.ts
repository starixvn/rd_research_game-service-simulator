export async function getGames(): Promise<Game[]> {
    const games = window?.supportedGames ?? []
    return Promise.resolve(games);
}