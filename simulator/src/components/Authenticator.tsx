import { useObservable } from "react-rx";
import { test$ } from "../subjects/test";

export function AuthLabel() {

    const value = useObservable(test$);

    return <p>
        {value}
    </p>
}