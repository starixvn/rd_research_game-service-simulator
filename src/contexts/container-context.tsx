import ContainerLib from "../lib/container";
import React, { PropsWithChildren } from "react";

export const ContainerContext = 
    React.createContext<{container: ContainerLib.Container | null }>({ container: null });

type ContainerContextProps = PropsWithChildren<{
    container: ContainerLib.Container;
}>

export const ContainerProvider: React.FC<ContainerContextProps> = (props) => {
    return <ContainerContext.Provider value={{ container: props.container }}>
        {props.children}
    </ContainerContext.Provider>
}