import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import OAuth from "../components/OAuth";

export interface Props {

}

enum State {
    Login,
    Register
}

function LoginPage(props: Props) {
    const [state, setState] = useState(State.Login);
    const changeState = () => {
        if (state === State.Login) {
            setState(State.Register);
        } else {
            setState(State.Login);
        }
    };
    
    return <>
        {state == State.Login && <LoginForm/>}
        {state == State.Register && <RegisterForm/>}
        <button type={"button"} onClick={changeState}>{state == State.Login ? "Register" : "Login"}</button>
        <OAuth/>
    </>
}

export default LoginPage;