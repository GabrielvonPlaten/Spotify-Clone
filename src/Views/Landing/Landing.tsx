import React, { useState, useEffect } from 'react';
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
import { RecentlyPlayedTracksInterface } from '../../Interfaces/TracksInterface';

const spotifyApi = new SpotifyWebApi();

const Landing: React.FC<{ code: string }> = ({ code }) => {
  useAuth(code);
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector((state: any) => state.accessToken);

  const recentlyPlayedTracks = useSelector(
    (state: RecentlyPlayedTracksInterface) => state.recentlyPlayedTracks,
  );

  useEffect(() => {
    if (accessToken === '') return history.push('/');

    apiCalls();
  }, [accessToken, history, code]);

  const apiCalls = async () => {
    const accessTokenFromStorage: string = localStorage.getItem('accessToken');
    dispatch(setUserAction(accessTokenFromStorage));
    dispatch(setRecentlyPlayedTracksAction(accessTokenFromStorage));
  };

  // console.log(recentlyPlayedTracks.tracks.recentlyPlayedTracks);

  return (
    <div>
      <Navbar />
      <section className='section'>
        <label className='section-label'>Recently Played</label>
        <div className='section__inline-items'>
          {recentlyPlayedTracks.tracks.recentlyPlayedTracks?.items.map(
            (track: any, index: number) => (
              <Tracks key={index} track={track.track} />
            ),
          )}
        </div>
      </section>
    </div>
  );
};

export default Landing;
