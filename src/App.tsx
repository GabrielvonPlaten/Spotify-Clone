import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

const code = new URLSearchParams(window.location.search).get('code');

// Views
import Login from './Views/Login/Login';
import Home from './Views/Home/Home';
import ScrollToTop from './ScrollToTop';

const App: React.FC = () => {
  // Development
  // localStorage.getItem('accessToken') !== ''
  return (
    <BrowserRouter>
      <ScrollToTop />
      {code || localStorage.getItem('accessToken') !== '' ? (
        <Home code={code} />
      ) : (
        <Login />
      )}
    </BrowserRouter>
  );
};

export default App;
