import React, { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from '../../useAuth';
import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER_DATA } from '../../store/types/userTypes';

// Components
import Navbar from '../../Components/Navbar/Navbar';
import Profile from '../../views/Profile/Profile';

const spotifyApi = new SpotifyWebApi();

const Landing: React.FC<{ code: string }> = ({ code }) => {
  useAuth(code);
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector((state: any) => state.accessToken);

  useEffect(() => {
    if (accessToken === '') return history.push('/');
    spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

    apiCalls();
  }, [accessToken, history, code]);

  const apiCalls = async () => {
    // Get user
    spotifyApi.getMe().then((data: any) => {
      dispatch({
        type: SET_USER_DATA,
        payload: {
          country: data.body.country,
          display_name: data.body.display_name,
          email: data.body.email,
          id: data.body.id,
          external_urls: data.body.external_urls.spotify,
          imageUrl: data.body.images[0].url,
          product: data.body.product,
        },
      });
    });
  };

  return (
    <div>
      <Navbar />
      <Profile />
      <button>Button</button>
    </div>
  );
};

export default Landing;
