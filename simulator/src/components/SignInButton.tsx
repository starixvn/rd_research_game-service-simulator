import chance from "chance";
import { useObservable } from "react-rx";
import { test$ } from "../subjects/test";
export function SignInButton() {
    const value = useObservable(test$);
    const onChangeValue = () => {
        test$.next(chance().name())
    }
    return <button onClick={() => onChangeValue()}>
            aa {value}
        </button>
}