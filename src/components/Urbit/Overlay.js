import * as React from "react";
import { useState } from "react";
import urbitLogo from "./urbit.svg";
import visorLogo from "./visor-logo.svg";
import { useStore } from "../../store";

export default function Overlay(props) {
  const { isConnected, isInstalled, recheckConnection, checkPerms, hasPerms } = useStore();
  const [connected, setConnected] = useState(props.connected);
  console.log(visorLogo, "visor logo")

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
  if (!isInstalled)
    return (
      <div className="visor-wall">
        <div className="wrapper">
          <a href="http://urbitvisor.com" target="_blank">
            <div
              className="uv-install-prompt uv-login-prompt"
            >
              <img src={visorLogo}></img>
              <p>To use the Urbit Dashboard, you need to install the Urbit Visor Browser Extension</p>
              <p>Click here and follow the instructions</p>
            </div></a>
        </div>
      </div>
    )
  else if (isConnected)
    return (
      <div className="visor-wall">
        <div className="wrapper">
          <div
            onClick={requestPerms}
            className="uv-prompt uv-border uv-login-prompt"
          >
            <img src={visorLogo}></img>
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
            <img src={visorLogo}></img>
            <p>Connect to Urbit Visor</p>
          </div>
        </div>
      </div>
    );
}
