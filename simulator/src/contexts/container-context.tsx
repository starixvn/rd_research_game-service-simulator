import { Container } from "inversify";
import React, { PropsWithChildren } from "react";

export const ContainerContext = 
    React.createContext<{container: Container | null }>({ container: null });

type ContainerContextProps = PropsWithChildren<{
    container: Container;
}>

export const ContainerProvider: React.FC<ContainerContextProps> = (props) => {
    return <ContainerContext.Provider value={{ container: props.container }}>
        {props.children}
    </ContainerContext.Provider>
}