import React, { useState, useEffect } from 'react';
import './Landing.sass';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from '../../useAuth';
import { useHistory } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from '../../store/actions/userActions';

// Components
import SearchResults from '../SearchResults/SearchResults';
import Navbar from '../../Components/Navbar/Navbar';
import Player from '../../Components/Player/Player';
import SongView from '../SongView/SongView';
import SearchBar from '../../Components/SearchBar/SearchBar';

const spotifyApi = new SpotifyWebApi();

const Landing: React.FC<{ code: string }> = ({ code }) => {
  useAuth(code);
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector((state: any) => state.accessToken);

  // Search
  const searchResults = useSelector((state: any) => state.searchResults);

  useEffect(() => {
    if (accessToken === '') return history.push('/');

    apiCalls();
  }, [accessToken, history, code]);

  const apiCalls = () => {
    const accessTokenFromStorage: string = localStorage.getItem('accessToken');
    dispatch(setUserAction(accessTokenFromStorage));
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
