import React, {useContext, useEffect, useState} from "react";
import {ApiError, ApplicationUser, AuthService, OpenAPI} from "../api";

export interface AuthStorage {
    isAuthenticated: boolean
    setToken: (token: string | null | undefined) => void,
    userLoading: boolean
    user?: ApplicationUser,
    token: string | null | undefined
}

const AuthContext = React.createContext<AuthStorage>({
    isAuthenticated: false, setToken: () => {}, 
    userLoading: false,
    token: undefined
});
export {AuthContext};

function useAuth() {
    const auth = useContext(AuthContext)

    return auth
}

export {useAuth}

export default function AuthProvider(props: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userLoading, setUserLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null | undefined>(undefined);
    const [user, setUser] = useState<ApplicationUser>();

    const promiseRejectionHandler = (e: PromiseRejectionEvent) => {
        if (e.reason instanceof ApiError && e.reason.status === 401) {
            setToken(undefined)
            e.preventDefault()
        }
    }
    
    console.log("Render", isAuthenticated, userLoading, token)

    useEffect(() => {
        OpenAPI.TOKEN = token || undefined
        if (token) {
            localStorage.setItem("token", token)
            setUserLoading(true)
            AuthService.getApiAuthMe().then((u) => {
                setUser(u)
                setUserLoading(false)

                if (!u) setToken(undefined)
            }).catch((e) => {
                setUserLoading(false)
                if (!(e instanceof TypeError)) setToken(undefined)
            })
        } else if (token === null) {
            localStorage.removeItem("token")
            setUser(undefined)
            setUserLoading(false)
        }
        setIsAuthenticated(!!token)
    }, [token])

    useEffect(() => {
        let t = localStorage.getItem("token")
        setIsAuthenticated(t !== null)
        setToken(t)
        
        const user = localStorage.getItem("user")
        if (user) {
            setUser(JSON.parse(user))
            setUserLoading(false)
        }

        window.addEventListener("unhandledrejection", promiseRejectionHandler);

        return () => {
            window.removeEventListener("unhandledrejection", promiseRejectionHandler);
        };
    }, [])
    
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
        } else {
            localStorage.removeItem("user")
        }
    }, [user])

    return <AuthContext.Provider value={{isAuthenticated, setToken, userLoading, user, token}}>{props.children}</AuthContext.Provider>
}
