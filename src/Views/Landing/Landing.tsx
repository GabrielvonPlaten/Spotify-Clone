import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from '../../useAuth';
import { useHistory } from 'react-router-dom';

// Components
import Navbar from '../../Components/Navbar/Navbar';
import Profile from '../../views/Profile/Profile';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
});

const Landing: React.FC<{ code: string }> = ({ code }) => {
  useAuth(code);
  const history = useHistory();
  const accessToken = useSelector((state: any) => state.accessToken);

  useEffect(() => {
    if (accessToken === '') return console.log('hello');
    spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

    spotifyApi.getMe().then((data) => {
      console.log(data.body);
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
