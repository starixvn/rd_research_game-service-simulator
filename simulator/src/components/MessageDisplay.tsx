import { useGameEvent } from "../hooks/useGameEvent"
import MessageDisplayItem from "./event-display/MessageDisplayItem";

export function MessageDisplay() {
    const { gameEvents } = useGameEvent();

    return gameEvents.map((item, index, array) => {
        return {
            event: item,
            key: array.length - 1 - index
        }
    }).slice(0, 200).map((item) => {
        return <MessageDisplayItem event={item.event} key={item.key}/>
    });
}