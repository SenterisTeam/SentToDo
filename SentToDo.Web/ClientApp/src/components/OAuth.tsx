import {useEffect, useState} from "react";
import { useAuth } from "./AuthProvider";
import GoogleOAuthButton from "./GoogleOAuthButton";
import {useNavigate} from "react-router-dom";

type Provider = {
    displayName: string;
    button: any;
    provider: string;
}

const providers: Provider[] = [
    {displayName: "Google", button: GoogleOAuthButton, provider: "Google"}
]

export interface Props {

}

function OAuth(props: Props) {
    const [authWindow, setAuthWindow] = useState<Window | null>();
    const [authProcessing, setAuthProcessing] = useState<boolean>(false);
    const auth = useAuth();
    const navigate = useNavigate()
    
    const onFocus = () => {
        authWindow?.close()
        setAuthProcessing(false)
        setAuthWindow(null)
    }
    
    useEffect(() => {
        if (authProcessing) window.addEventListener("focus", onFocus);
        return () => window.removeEventListener("focus", onFocus);
    }, [authProcessing, authWindow]);
    
    const onMessage = (event: MessageEvent) => {
        if (event.data.type === "TOKEN") {
            auth.setToken(event.data.token);
            authWindow?.close()
            
            navigate("/app", {replace: true})
            
            setAuthProcessing(false);
            setAuthWindow(null);
        }
    }
    
    useEffect(() => {
        if (authProcessing) window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, [authProcessing]);
    
     const onStartOAuth = (provider: Provider) => {
         if (!authProcessing) {
             setAuthProcessing(true)
             const popup = window.open('', `${provider.displayName} OAuth`, "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,\n" + "width=500,height=600,top=100,left=200")
             try {
                 if(popup && popup.location.href === 'about:blank'){
                     popup.focus()
                     popup.location.href = "/api/auth/oauth?provider=" + provider.provider;

                     console.log('OAuth promt opened')
                     setAuthWindow(popup)
                 } else {
                     console.log('Alredy opened')
                     setAuthProcessing(false)
                 }
             } catch (e) {
                 if (e instanceof DOMException) {
                     console.log('Alredy opened')
                     setAuthProcessing(false)
                 } else {
                     throw e
                 }
             }
         }
     }
    
    return <>
        {providers.map(provider => <provider.button onClick={() => onStartOAuth(provider)}/>)}
    </>
}

export default OAuth;