import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';

const code = new URLSearchParams(window.location.search).get('code');

// Views
import Login from './Views/Login/Login';
import Home from './Views/Home/Home';

const App: React.FC = () => {
  return <div>{code ? <Home code={code} /> : <Login />}</div>;
};

export default App;
