import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";

export interface Props {

}

function GoogleOAuthCallback(props: Props) {
    const {search} = useLocation();

    useEffect(() => {
        fetch(`/api/oauth/google${search}`, {credentials: "include"}).then(r => r.json()).then(d =>  window.opener.postMessage({
            type: "TOKEN",
            token: d.token
        }, "*"));
    }, [])

    return <></>
}

export default GoogleOAuthCallback;