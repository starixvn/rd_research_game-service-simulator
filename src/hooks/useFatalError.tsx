import { useState } from "react";
import { FatalError } from "../contexts/fatal-error-context";

export function useFatalError() {
    const [ fatalError, setFatalError] = useState<FatalError | null>(null);

    return {
        fatalError,
        setFatalError
    }
}