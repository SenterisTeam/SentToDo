import {Outlet} from "react-router-dom";
import StorageProvider from "../components/StorageProvider";

export interface Props {

}

function AppPage(props: Props) {
    return <StorageProvider>
        <nav>Nav</nav>
        <Outlet/>
    </StorageProvider>
}

export default AppPage;