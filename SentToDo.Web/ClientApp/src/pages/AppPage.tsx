import {Outlet} from "react-router-dom";
import StorageProvider, {SavingState} from "../components/StorageProvider";

export interface Props {

}

function AppPage(props: Props) {
    return <StorageProvider>
        {(s) => {
            return <>
                {s.savingState === SavingState.AWAITING_SAVE && <div>Awaitng...</div>}
                {s.savingState === SavingState.SAVED && <div>Saved...</div>}
                <Outlet/>
            </>
        }}
    </StorageProvider>
}

export default AppPage;