import * as React from "react";
import urbit from "./urbit.svg";



export default function Overlay(props) {
    function promptConnection(){
        window.urbitVisor.promptConnection();
    }
    function requestPerms() {
        window.urbitVisor.requestPermissions(["shipName", "shipURL", "scry", "subscribe", "poke", "thread"]);
    }
    if (props.connected)
        return (
            <div className="visor-wall">
                <div className="wrapper">
                    <div onClick={requestPerms} className="uv-prompt uv-border uv-login-prompt">
                        <img src={urbit}></img>
                        <p>Click to give permissions</p>
                    </div>
                </div>
            </div>
        )
    else
        return (
            <div className="visor-wall">
                <div className="wrapper">
                    <div onClick={promptConnection} className="uv-prompt uv-border uv-login-prompt">
                        <img src={urbit}></img>
                        <p>Connect to Urbit Visor</p>
                    </div>
                </div>
            </div>
        )
}