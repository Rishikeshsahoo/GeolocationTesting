import React from "react";
import {NavLink} from "react-router-dom"
import "../css/styles.css"
import logo from "../imgs/logo.jpeg"

export default function Navbar() {
  return (
    <div id="navbar">
      <header>
      <p className="logo"><img src={logo} style={{width:"7%", margin:0,padding:0}}/></p>
      <nav>
        
      </nav>
     
      </header>
    </div>
  );
}
