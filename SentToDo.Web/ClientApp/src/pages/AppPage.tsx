import {Outlet} from "react-router-dom";
import StorageProvider, {SavingState} from "../components/StorageProvider";
import {useAuth} from "../components/AuthProvider";

export interface Props {

}

function AppPage(props: Props) {
    const auth = useAuth()
    
    return <StorageProvider>
        {(s) => {
            return <div style={{width: '100%', minHeight: '100vh', background: '#f1f1f1'}}>
                {/*{auth.isAuthenticated ? auth.user?.userName : "Not logged in"}*/}
                {/*{s.savingState === SavingState.AWAITING_SAVE && <div>Awaitng...</div>}*/}
                {/*{s.savingState === SavingState.SAVED && <div>Saved...</div>}*/}
                <Outlet/>
            </div>
        }}
    </StorageProvider>
}

export default AppPage;