import React from 'react';
import './Navbar.css';
import Logo from '../../assets/app-logo.png';
import Kitchen from '../../assets/kitchen-icon.png';
import Overview from '../../assets/overview.png';
import Donation from '../../assets/donation.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='navbar'>
      <NavLink to='/mykitchen'>
        <div className='nav-container'>
          <img src={Kitchen} alt='kitchen logo' className='nav-button' />
          <label>My Kitchen</label>
        </div>
      </NavLink>
      <div className='nav-header'>
        <img src={Logo} alt='app logo' className='app-logo' />
        <h1 className='title'>WASTE NOT</h1>
        <h1 className='title'>WANT NOT</h1>
        <NavLink to='/'>
          <div className='nav-container'>
            <img src={Overview} alt='kitchen logo' className='nav-button' />
            <label>Overview</label>
          </div>
        </NavLink>
      </div>
      <NavLink to='/donations'>
        <div className='nav-container'>
          <img src={Donation} alt='kitchen logo' className='nav-button' />
          <label>Donation Page</label>
        </div>
      </NavLink>
    </header>
  )
}

export default Navbar;