import React, { useState, useEffect } from 'react';
import './Home.sass';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from '../../useAuth';
import { useHistory } from 'react-router-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from '../../store/actions/userActions';

// Components
import SearchResults from '../SearchResults/SearchResults';
import Navbar from '../../Components/Navbar/Navbar';
import Player from '../../Components/Player/Player';
import SongView from '../SongView/SongView';
import SearchBar from '../../Components/SearchBar/SearchBar';

// View
import Artist from '../Artist/Artist';

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
    <BrowserRouter>
      <div className='landing'>
        <div className='landing__body'>
          <Navbar />
          <section className='main-section'>
            <SearchBar />
            {/* Hide every route when there are search results */}
            {!searchResults?.songResults?.hasOwnProperty('tracks') ? (
              <Switch>
                <Route exact path='/' component={SongView} />
                <Route path='/artist/:artist' component={Artist} />
              </Switch>
            ) : (
              <SearchResults searchResults={searchResults} />
            )}
          </section>
        </div>
        <Player />
      </div>
    </BrowserRouter>
  );
};

export default Landing;
