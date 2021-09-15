import * as React from "react";
import { useState, useEffect } from "react";
import Sigil from "./Sigil";
import {useStore} from "../../store";

export default function Avatar(props) {
  const {activeShip} = useStore();
  return(
      <div className="uv-border uv-avatar">
      <Sigil patp={activeShip} size={40} />
       <p>~{activeShip}</p>
      </div>
    )
}


