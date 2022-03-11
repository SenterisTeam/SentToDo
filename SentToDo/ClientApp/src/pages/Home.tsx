import { Link } from "react-router-dom";
import PageTranslation from "../components/PageTranslation";

function Home() {
    return <PageTranslation><h1>Hello</h1><Link to={'settings'}>A</Link></PageTranslation>
}

export default Home;