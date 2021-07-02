import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import useAuth from './useAuth';
import { useSelector } from 'react-redux';

const code = new URLSearchParams(window.location.search).get('code');

// Views
import Login from './Views/Login/Login';
import Home from './Views/Home/Home';

const App: React.FC = () => {
  // Development
  // localStorage.getItem('accessToken') !== ''
  return (
    <div>
      {code || localStorage.getItem('accessToken') !== '' ? (
        <Home code={code} />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
