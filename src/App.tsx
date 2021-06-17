import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';

const code = new URLSearchParams(window.location.search).get('code');

// Views
import Home from './Views/Home/Home';
import Landing from './Views/Landing/Landing';

const App: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route
          exact
          path='/landing'
          render={(props) => <Landing {...props} code={code} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
