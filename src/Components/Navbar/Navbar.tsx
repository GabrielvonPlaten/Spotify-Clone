import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.sass';

// Redux
import { useSelector } from 'react-redux';

// Interface
import { UserInterface } from '../../Interfaces/UserInterface';

const Navbar: React.FC = () => {
  const userData = useSelector((state: UserInterface) => state.userData.user);

  return (
    <header className='navbar'>
      <div className='user_display'>
        {/* <img className='user_display__avatar' src={userData.imageUrl} /> */}
        <h2 className='user_display__display_name'>{userData.display_name}</h2>
      </div>
    </header>
  );
};

export default Navbar;
