import * as gc from "@sg/game-client-base";
import { Button } from "antd";
import { handle, observer } from "observer";
import { Component, ReactNode } from "react";


@observer
export class SignInButton extends Component {
    
    @handle(gc.Auth.AuthHandlers.SSO)
    sso() {
        return new URLSearchParams(window.location.search);
    }


    render(): ReactNode {
        return <Button onClick={() => this.sso()}>
            Sign In
        </Button>
    }
}