import { useGameEvent } from "../hooks/useGameEvent"
import { MessageDisplayItem } from "./event-display/MessageDisplayItem";

export function MessageDisplay() {

    const { gameEvents } = useGameEvent();

    return gameEvents.map((item, index, array) => {
        return <MessageDisplayItem event={item} key={array.length - 1 - index}/>
    })
}