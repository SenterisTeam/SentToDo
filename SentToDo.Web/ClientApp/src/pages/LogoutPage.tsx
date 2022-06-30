import {useAuth} from "../components/AuthProvider";
import {Navigate, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {db} from "../data/db";

export interface Props {

}

function LogoutPage(props: Props) {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (typeof auth.token === "string") {
            Promise.all([
                db.tasks.clear(),
                db.history.clear()
            ]).then(() => auth.setToken(null))
        } else if (auth.token === null) {
            navigate("/", {replace: true});
        }

    }, [auth.token]);

    return <></>
}

export default LogoutPage;