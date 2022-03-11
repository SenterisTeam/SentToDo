import PageTranslation from "../components/PageTranslation";
import {Link} from "react-router-dom";

function Settings() {
    return <PageTranslation><h1>Settings</h1><Link to={'/'}>back</Link></PageTranslation>
}

export default Settings;