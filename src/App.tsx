import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const code = new URLSearchParams(window.location.search).get('code');

// Views
import Home from './Views/Home/Home';
import Landing from './Views/Landing/Landing';

import ScrollToTop from './ScrollToTop';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route
          path='/landing'
          render={(props) => <Landing {...props} code={code} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
