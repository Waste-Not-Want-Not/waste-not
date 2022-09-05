import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='navbar'>
      <NavLink to='/mykitchen'>
        <button className='nav-button'>MY KITCHEN</button>
      </NavLink>
      <div className='nav-header'>
        <h1 className='title'>Waste Not, Want Not</h1>
        <NavLink to='/'>
          <button>Overview</button>
        </NavLink>
      </div>
      <NavLink to='/donations'>
        <button className='nav-button'>DONATION PAGE</button>
      </NavLink>
    </header>
  )
}

export default Navbar;