import { interfaces } from "../lib/container";
import { useContext } from "react";
import { ContainerContext } from "../contexts/container-context";

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
    const { container } = useContext(ContainerContext);
    if (!container) throw new Error("no container");
    return container.get<T>(identifier);
}