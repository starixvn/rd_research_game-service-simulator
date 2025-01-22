import { useGameEvent } from "../hooks/useGameEvent"
import { MessageDisplayItem } from "./event-display/MessageDisplayItem";

export function AuthLabel() {

    const { gameEvents } = useGameEvent();

    return gameEvents.map((item, index) => {
        return <MessageDisplayItem event={item} key={index}/>
    })
}