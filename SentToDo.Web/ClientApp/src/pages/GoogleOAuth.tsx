import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";

export interface Props {

}

function GoogleOAuth(props: Props) {
    const {search} = useLocation();
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        console.log(document.cookie)
        if (!loading) fetch(`/api/oauth/google${search}`, {credentials: "include"}).then(r => r.json()).then(d => console.log(d));
        setLoading(true)
    }, [])

    return <>hi</>
}

export default GoogleOAuth;