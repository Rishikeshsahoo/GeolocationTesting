import React from "react";
import {NavLink} from "react-router-dom"
import "../css/styles.css"
import logo from "../imgs/logo.jpeg"

export default function Navbar({windowSize}) {
  return (
    <div id="navbar" style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
      <img src={logo} style={{width:(windowSize>=450)?"8%":"20%", margin:0,padding:0}}/>
      
    </div>
  );
}
