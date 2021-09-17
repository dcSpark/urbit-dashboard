import * as React from "react";
import { useState } from "react";
import urbitLogo from "./urbit.svg";
import { useStore } from "../../store";

export default function Overlay(props) {
  const { isConnected, recheckConnection, checkPerms, hasPerms } = useStore();
  const [connected, setConnected] = useState(props.connected);

  function promptConnection() {
    window.urbitVisor.promptConnection();
  }

  function requestPerms() {
    window.urbitVisor.requestPermissions([
      "shipName",
      "shipURL",
      "scry",
      "subscribe",
      "poke",
      "thread",
    ]);
  }

  if (isConnected)
    return (
      <div className="visor-wall">
        <div className="wrapper">
          <div
            onClick={requestPerms}
            className="uv-prompt uv-border uv-login-prompt"
          >
            <img src={urbitLogo}></img>
            <p>Connect to Urbit Visor</p>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="visor-wall">
        <div className="wrapper">
          <div
            onClick={promptConnection}
            className="uv-prompt uv-border uv-login-prompt"
          >
            <img src={urbitLogo}></img>
            <p>Connect to Urbit Visor</p>
          </div>
        </div>
      </div>
    );
}
