import * as React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './Styles/style.sass';
import SpotifyWebApi from 'spotify-web-api-node';
import App from './App';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('App'),
);
