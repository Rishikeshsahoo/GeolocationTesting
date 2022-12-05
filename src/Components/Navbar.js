import React from "react";
import {NavLink} from "react-router-dom"
import "../css/styles.css"
import logo from "../imgs/logo.png"

export default function Navbar() {
  return (
    <div id="navbar">
      <header>
      <p className="logo"><img src={logo} style={{width:"20%", margin:0,padding:0}}/></p>
      <nav>
        
      </nav>
      <NavLink to="" className="cta" ><button className="contact_button">Contact</button></NavLink>
      </header>
    </div>
  );
}
