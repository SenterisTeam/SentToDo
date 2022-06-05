import { useAuth } from "../components/AuthProvider";
import {Navigate, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export interface Props {

}

function LogoutPage(props: Props) {
    const auth = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log(auth)
        if (typeof auth.token === "string") {
            auth.setToken(null);
        } else if (auth.token === null) {
            navigate("/", {replace: true});
        }
        
    }, [auth.token]);
    
    return <></>
}

export default LogoutPage;