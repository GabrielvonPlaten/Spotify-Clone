import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from '../../useAuth';
import { SET_ACCESS_TOKEN } from '../../store/types/codeTypes';
import { Route, Switch } from 'react-router-dom';

// Components
import Navbar from '../../Components/Navbar/Navbar';
import About from '../../views/About/About';
import Profile from '../../views/Profile/Profile';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const Landing: React.FC<{ code: string }> = ({ code }) => {
  const dispatch = useDispatch();
  const accessToken = useAuth(code);

  useEffect(() => {
    if (!accessToken) return;
    dispatch({
      type: SET_ACCESS_TOKEN,
      accessToken,
    });

    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const getAlbums = () => {
    spotifyApi
      .getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
      .then((data: any) => {
        console.log(data.body);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path='/landing/about' component={About} />
        <Route exact path='/landing' component={Profile} />
      </Switch>
      <button onClick={getAlbums}>Get Albums</button>
    </div>
  );
};

export default Landing;
