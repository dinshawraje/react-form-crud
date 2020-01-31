import * as React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const TopBar = () => {
    return (
      <Navbar className="navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" className='navbar-brand'>Employee</Link>
            <Nav className="mr-auto">            
            <Link to="/create-emp" className='nav-link'>New Employee</Link>
            <Link to="/emp-lists" className='nav-link'>Employee List</Link> 
            </Nav>
      </Navbar>
    )
}
