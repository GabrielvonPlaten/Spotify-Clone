import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SET_ACCESS_TOKEN } from './store/types';
const code = new URLSearchParams(window.location.search).get('code');

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// Views
import Login from './Views/Login/Login';
import Home from './Views/Home/Home';
import ScrollToTop from './ScrollToTop';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: any) => state.accessToken);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) return;
    dispatch({
      type: SET_ACCESS_TOKEN,
      payload: localStorage.getItem('accessToken'),
    });
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {code || accessToken ? <Home code={code} /> : <Login />}
    </BrowserRouter>
  );
};

export default App;
