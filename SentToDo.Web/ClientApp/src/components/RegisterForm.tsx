import {ChangeEvent, FormEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import {AuthService, LoginModel, RegisterModel} from "../api";
import { ValidationProblemDetails } from "../data/ValidationProblemDetails";
import {useAuth} from "./AuthProvider";

export interface Props {

}

function LoginForm(props: Props) {
    const auth = useAuth()
    const navigate = useNavigate()
    const [registerModel, setRegisterModel] = useState<RegisterModel>({email: "", password: "", username: ""});
    const [errors, setErrors] = useState<ValidationProblemDetails>();
    
    const setUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setRegisterModel({...registerModel, username: event.target.value});
    }
    
    const setEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setRegisterModel({...registerModel, email: event.target.value});
    }
    
    const setPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setRegisterModel({...registerModel, password: event.target.value});
    }
    
    const register = (event: FormEvent) => {
        event.preventDefault()
        AuthService.postApiAuthRegister(registerModel).then(() => {
            AuthService.postApiAuthLogin({username: registerModel.username, password: registerModel.password}).then(response => {
                auth.setToken(response.token);
                navigate("/app", {replace: true})
            }).catch(error => {
                setErrors(JSON.parse(error.body));
            });
        }).catch((error) => {
            setErrors(JSON.parse(error.body));
        })
    }
    
    return <form onSubmit={register}>
        {errors && <div>{Object.entries(errors.errors).map((([f, e]) => e.map(e => <p>{e}</p>)))}</div>}
        <input onChange={setUsername} value={registerModel.username} placeholder={"Login"} name="username" required/>
        <input onChange={setEmail} value={registerModel.email} placeholder={"Email"} type={"email"} required/>
        <input onChange={setPassword} value={registerModel.password} placeholder={"Password"} type={"password"} required autoComplete={"new-password"}/>
        <button type={"submit"}>Register</button>
    </form>
}

export default LoginForm;