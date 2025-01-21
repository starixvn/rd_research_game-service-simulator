import { AuthLabel } from "../components/Authenticator";
import { SignInButton } from "../components/SignInButton";

export function IndexPage() {

    return <div>
        Wellcome to the Summoner Rift
        <AuthLabel/>
        <SignInButton/>    
    </div>
}