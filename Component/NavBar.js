import React from "react";
import { Link } from 'react-router-dom';

const NavBar=()=>{
    return(
        <div>
      <header>
        <h1>Welcome to CAB SERVICE</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/adminlogin">Admin</Link></li>
          </ul>
        </nav>
      </header>
      </div>
    )
}

export default NavBar;