import React, { useState, useEffect } from 'react';
import './Landing.sass';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from '../../useAuth';
import { useHistory } from 'react-router-dom';
import { Switch, Route, Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from '../../store/actions/userActions';
import { setRecentlyPlayedTracksAction } from '../../store/actions/tracksActions';

// Components
import SearchResults from '../SearchResults/SearchResults';
import Navbar from '../../Components/Navbar/Navbar';
import Player from '../../Components/Player/Player';
import SongView from '../SongView/SongView';
import SearchBar from '../../Components/SearchBar/SearchBar';

const spotifyApi = new SpotifyWebApi();

const Landing: React.FC<{ code: string; match: any }> = ({ code, match }) => {
  useAuth(code);
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector((state: any) => state.accessToken);

  // Test
  const searchResults = useSelector((state: any) => state.searchResults);
  console.log(searchResults);

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
    <div className='landing'>
      <div className='landing__body'>
        <Navbar />
        <section className='main-section'>
          <SearchBar />
          {!searchResults?.songResults?.hasOwnProperty('tracks') ? (
            <div>
              <Switch>
                <Route path='/landing' component={SongView} />
                <Route path='/landing/search' component={SearchResults} />
              </Switch>
            </div>
          ) : (
            <SearchResults searchResults={searchResults} />
          )}
        </section>
      </div>
      <Player />
    </div>
  );
};

export default Landing;
