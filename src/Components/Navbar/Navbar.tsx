import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.sass';

// Redux
import { useSelector } from 'react-redux';
import { setUserData } from '../../store/types/userTypes';

// Interface
import { UserInterface } from '../../Interfaces/UserInterface';

const Navbar: React.FC = () => {
  const userData = useSelector((state: UserInterface) => state.userData);

  return (
    <header className='navbar'>
      <div className='navbar--title'>
        <h1>Spotify Clone!</h1>
      </div>
      <div className='user_display'>
        <img className='user_display__avatar' src={userData.user.imageUrl} />
        <h2 className='user_display__display_name'>
          {userData.user.display_name}
        </h2>
      </div>
      {/* <NavLink
        to='/'
        activeClassName='is-active'
        className='navbar__item router-link'
        exact={true}
      >
        Home
      </NavLink>
      <NavLink
        to='/landing'
        activeClassName='is-active'
        className='navbar__item router-link'
      >
        About
      </NavLink> */}
    </header>
  );
};

export default Navbar;
