import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const code = new URLSearchParams(window.location.search).get('code');

// Views
import Home from './Views/Home/Home';
import Landing from './Views/Landing/Landing';

// Components
import Navbar from './Components/Navbar/Navbar';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        {code ? <Landing code={code} /> : <Home />}
      </div>
    </BrowserRouter>
  );
};

export default App;
