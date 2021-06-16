import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from '../../useAuth';
import { SET_ACCESS_TOKEN } from '../../store/types/codeTypes';
import { Route, Switch, useHistory } from 'react-router-dom';

// Components
import Navbar from '../../Components/Navbar/Navbar';
import Profile from '../../views/Profile/Profile';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const Landing: React.FC<{ code: string }> = ({ code }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  useAuth(code);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!accessToken) return history.push('/');

    dispatch({
      type: SET_ACCESS_TOKEN,
      accessToken,
    });

    spotifyApi.setAccessToken(accessToken);

    spotifyApi
      .getMe()
      .then((data) => {
        console.log(data.body);
      })
      .catch(() => {
        localStorage.removeItem('accessToken');
        history.push('/');
      });
  }, [accessToken, history, code]);

  return (
    <div>
      <Navbar />
      <Profile />
      <button>Button</button>
    </div>
  );
};

export default Landing;
