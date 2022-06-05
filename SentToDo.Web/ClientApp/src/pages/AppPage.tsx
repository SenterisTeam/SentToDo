import {Outlet} from "react-router-dom";
import StorageProvider, {SavingState} from "../components/StorageProvider";
import {useAuth} from "../components/AuthProvider";

export interface Props {

}

function AppPage(props: Props) {
    const auth = useAuth()
    
    return <StorageProvider>
        {(s) => {
            return <>
                {auth.isAuthenticated ? auth.user?.userName : "Not logged in"}
                {s.savingState === SavingState.AWAITING_SAVE && <div>Awaitng...</div>}
                {s.savingState === SavingState.SAVED && <div>Saved...</div>}
                <Outlet/>
            </>
        }}
    </StorageProvider>
}

export default AppPage;