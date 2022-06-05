import {ChangeEvent, FormEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import {AuthService, LoginModel} from "../api";
import { ValidationProblemDetails } from "../data/ValidationProblemDetails";
import {useAuth} from "./AuthProvider";

export interface Props {

}

function LoginForm(props: Props) {
    const auth = useAuth()
    const navigate = useNavigate()
    const [loginModel, setLoginModel] = useState<LoginModel>({password: "", username: ""});
    const [errors, setErrors] = useState<ValidationProblemDetails>();
    
    const setUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginModel({...loginModel, username: event.target.value});
    }
    
    const setPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginModel({...loginModel, password: event.target.value});
    }
    
    const login = (event: FormEvent) => {
        event.preventDefault()
        AuthService.postApiAuthLogin(loginModel).then(response => {
            auth.setToken(response.token);
            navigate("/app", {replace: true})
        }).catch(error => {
            setErrors(JSON.parse(error.body));
        });
    }
    
    return <form onSubmit={login}>
        {errors && <div>{Object.entries(errors.errors).map((([f, e]) => e.map(e => <p>{e}</p>)))}</div>}
        <input onChange={setUsername} value={loginModel.username} placeholder={"Login"} required/>
        <input onChange={setPassword} value={loginModel.password} placeholder={"Password"} type={"password"} required autoComplete={"current-password"}/>
        <button type={"submit"}>Login</button>
    </form>
}

export default LoginForm;