import { Container } from "inversify";
import React from "react";

export const ContainerContext = React.createContext<{
    container: Container | null
}>({
    container: null
});

