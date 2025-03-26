import React from 'react';import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <div><h2><Link to='/' id='nav-logo'>Arkadhallen</Link></h2></div>
      <ul className='nav-items'>
        <li className='nav-item'>
          <Link to="/">Hem</Link>
        </li>
        <li className='nav-item'>
          <Link to="/Drinks">Dryck</Link>
        </li>
        <li className='nav-item'>
          <Link to="/vader">Väder</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;