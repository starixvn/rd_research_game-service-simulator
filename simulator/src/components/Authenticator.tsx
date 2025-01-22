import { useGameEvent } from "../hooks/useGameEvent"

export function AuthLabel() {

    const { gameEvents } = useGameEvent();

    return gameEvents.map((item) => {
        return <p>
            event: {item.name}
            payload: {JSON.stringify(item.payload)}
        </p>

    })
}