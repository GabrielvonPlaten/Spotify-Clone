import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SET_URL_CODE } from './store/types/codeTypes';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';

const code = new URLSearchParams(window.location.search).get('code');

// Views
import Home from './Views/Home/Home';
import Landing from './Views/Landing/Landing';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SET_URL_CODE,
      code,
    });
  }, [code]);

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
