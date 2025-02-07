const storageService = window.localStorage;

export async function getGames(): Promise<Game[]> {
    const gameString = storageService.getItem("games");

    if (!gameString) return Promise.resolve([]);

    const games = JSON.parse(gameString);

    if (!Array.isArray(games)) return Promise.resolve([]);

    return Promise.resolve(games);
}

export async function addGame(game: Game): Promise<void> {
    const games = await getGames();

    const newGameList = [...games, game];

    const gameString = JSON.stringify(newGameList);

    storageService.setItem("games", gameString);
}

export async function deleteGame(deleteIndex: number): Promise<void> {
    const games = await getGames();

    const newGameList = games.filter((index) => index !== deleteIndex)

    const gameString = JSON.stringify(newGameList);

    storageService.setItem("games", gameString);
}