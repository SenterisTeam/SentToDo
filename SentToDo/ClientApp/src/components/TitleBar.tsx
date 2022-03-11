import {ipcRenderer} from "electron-renderer";
import React, {useEffect, useState} from "react";
import './TitleBar.scss'
import EventEmitter from "events";
import Icons from '../images/titleBarIcons.json'
import { ReactComponent as Profile } from '../images/abstract-user-flat-3.svg';


const os = navigator.platform;
const osClass = {'Win32': 'win'}[os] || 'win'

export interface Props {

}

function TitleBar(props: Props) {
    const [maximized, setMaximize] = useState(false);

    function maximizedStatusChanged(event: EventEmitter, status: boolean) {
        setMaximize(status);
    }

    useEffect(() => {
        ipcRenderer.addListener("maximize-status", maximizedStatusChanged)
        return () => {
            ipcRenderer.removeListener("maximize-status", maximizedStatusChanged)
        }
    })

    return <nav className={`titileBar ${osClass}`}>
        <div className={"title"}><h5>SentToDo</h5></div>
        <div className={"account"}><button><Profile width={32} height={32}/> Name</button></div>
        <div className={"buttons"}>
            <button onClick={() => ipcRenderer.send('minimize')}>
                <svg viewBox="0 0 10.2 1"><rect x="0" y="50%" width="10.2" height="1" /></svg>
            </button>
            <button onClick={() => ipcRenderer.send('maximize')}>
                {maximized 
                    ? <svg viewBox='0 0 10.2 10.1'><path d='M2.1,0v2H0v8.1h8.2v-2h2V0H2.1z M7.2,9.2H1.1V3h6.1V9.2z M9.2,7.1h-1V2H3.1V1h6.1V7.1z'/></svg>
                    : <svg viewBox="0 0 10 10"><path d="M0,0v10h10V0H0z M9,9H1V1h8V9z" /></svg>
                }
            </button>
            <button className={"danger"} onClick={() => ipcRenderer.send('close')}>
                <svg viewBox="0 0 10 10"><polygon points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1" /></svg>
            </button>
        </div>
    </nav>
}

export default TitleBar;