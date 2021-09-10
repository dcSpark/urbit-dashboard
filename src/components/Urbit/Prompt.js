import * as React from "react";
import { useState, useEffect } from "react";
import urbit from "./urbit.svg";

export default function Prompt(props) {
    return (
      <div className="uv-border uv-login-prompt">
      <img src={urbit}></img>
       <p>Connect to Urbit Visor</p>
      </div>
    )
}


