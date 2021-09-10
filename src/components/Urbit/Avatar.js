import * as React from "react";
import { useState, useEffect } from "react";
import Sigil from "./Sigil";

export default function Avatar(props) {
  const [havePerms, setHavePerms] = useState(false)
  useEffect(()=>{
    window.urbitVisor.authorizedPermissions()
      .then(res => {
        if (res.response) getName()
      })
  })
  function getName(){
    window.urbitVisor.getShip()
      .then(res => {
        setHavePerms(true)
        setShip(res.response)
      })
  }
  const [ship, setShip] = useState("sampel-palnet");
   if (havePerms) return (
      <div className="uv-border uv-avatar">
      <Sigil patp={ship} size={40} />
       <p>~{ship}</p>
      </div>
    )
    else return (
      <div className="uv-border uv-perms-prompt">
      <p onClick={getName}>Please click on your Urbit Visor</p>
      </div>
    )
}


