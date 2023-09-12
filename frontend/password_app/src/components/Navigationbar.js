import React, { Fragment, useState } from 'react'
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

function Navbar() {
    return (
        <nav className="navbar navbar-dark, bg-primary" data-bs-theme="dark">
               <div className="container-fluid">
                   <a className='navbar-brand'> PassApp</a>
                   <form className="d-flex"  role='search'>
                       <div className="ml-auto  m-lg-3 mt-2" >
                           <Link style={{ color: 'white', textDecoration: 'None' }} to="/passwords">PASSWORDS</Link>
                       </div>

                       <div className="ml-auto m-lg-3 mt-2" >
                           <Link style={{ color: 'white', textDecoration: 'None' }} to="/notes">NOTES</Link>
                       </div>


                   </form>
               </div>
           </nav>
    )
}
export default Navbar