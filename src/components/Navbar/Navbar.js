import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='navbar'>
      <NavLink to='/'>
        <button>HOME</button>
      </NavLink>
      <h1>Waste Not, Want Not</h1>
      <button>DONATION PAGE</button>
    </header>
  )
}

export default Navbar;