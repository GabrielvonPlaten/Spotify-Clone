import React, { useState } from 'react';
import Logo from '../../Styles/images/logo.svg';
import './Home.sass';

const Home: React.FC = () => {
  const [count, setData] = useState<number>(0);

  return (
    <div className='app'>
      <img className='app__logo' src={Logo} />
      <h1 className='title'>Hello React + Typescript!</h1>
      <button onClick={() => setData(count + 1)}>+</button>
      <button onClick={() => setData(count - 1)}>-</button>
      <button onClick={() => setData(0)}>Reset</button>
      <p>Count: {count}</p>
    </div>
  );
};

export default Home;
