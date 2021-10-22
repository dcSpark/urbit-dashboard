import * as React from "react";
import visorLogo from "./visor-logo.svg";
import { useStore } from "../../store";
import { urbitVisor } from "@dcspark/uv-core";


export default function Overlay(props) {
  const { isConnected, isInstalled } =
    useStore();

  function promptConnection() {
    urbitVisor.promptConnection();
  }

  function requestPerms() {
    urbitVisor.requestPermissions([
      "shipName",
      "shipURL",
      "scry",
      "subscribe",
      "poke",
      "thread",
    ]).catch(err => console.log(err, "error requesting permissions"));
  }
  if (!isInstalled)
    return (
      <div className="visor-wall">
        <div className="wrapper">
          <a href="http://urbitvisor.com" target="_blank">
            <div className="uv-install-prompt uv-login-prompt">
              <img src={visorLogo}></img>
              <p>Urbit Visor is required to use the Urbit Dashboard</p>
            </div>
          </a>
        </div>
      </div>
    );
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
