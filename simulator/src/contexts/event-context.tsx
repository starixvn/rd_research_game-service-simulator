import React, { PropsWithChildren, useState } from "react";

type EventContextProps = {
    payload: string;
    setPayload: (payload: string) => void;
    eventName: string;
    setEventName: (eventName: string) => void;
}

export const EventContext = React.createContext<EventContextProps>({
    payload: "null",
    setPayload: () => {},
    eventName: "inGame",
    setEventName: () => {}
});


export const EventContextProvider = ({ children }: PropsWithChildren) => {

    
    const [payload, setPayload] = useState<string>("null");
    const [eventName, setEventName] = useState<string>("inGame");

    return <EventContext.Provider value={{ 
        eventName,
        payload,
        setEventName,
        setPayload
    }}>
        {children}
    </EventContext.Provider>
}