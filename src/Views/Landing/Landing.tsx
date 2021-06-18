import React, { useEffect } from 'react';
import './Landing.sass';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from '../../useAuth';
import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER_DATA } from '../../store/types/userTypes';
import { setUserAction } from '../../store/actions/userActions';
import { setRecentlyPlayedTracksAction } from '../../store/actions/setTracksActions';

// Components
import Navbar from '../../Components/Navbar/Navbar';
import Tracks from '../../Components/Tracks/Tracks';

const spotifyApi = new SpotifyWebApi();

const Landing: React.FC<{ code: string }> = ({ code }) => {
  useAuth(code);
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector((state: any) => state.accessToken);

  useEffect(() => {
    if (accessToken === '') return history.push('/');

    apiCalls();
  }, [accessToken, history, code]);

  const apiCalls = async () => {
    const accessTokenFromStorage: string = localStorage.getItem('accessToken');
    dispatch(setUserAction(accessTokenFromStorage));
    dispatch(setRecentlyPlayedTracksAction(accessTokenFromStorage));
  };

  return (
    <div>
      <Navbar />
      <section className='landing-section'>
        <label className='section-label'>Recently Played</label>
        <Tracks />
      </section>
    </div>
  );
};

export default Landing;
