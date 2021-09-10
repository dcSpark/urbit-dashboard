import * as React from "react";
import { useState, useEffect } from "react";
import Sigil from "./Sigil";

export default function Avatar(props) {
  const [ship, setShip] = useState("");
    return (
      <>
      <Sigil patp={ship} size={30} />
       <p>Login bro please bro</p>
      </>
    )
}


