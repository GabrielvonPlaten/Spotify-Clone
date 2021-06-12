import React from 'react';
import './Home.sass';

import Login from '../../Components/Login/Login';

const Home: React.FC = () => {
  return (
    <div className='app'>
      <Login />
    </div>
  );
};

export default Home;
