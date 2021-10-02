import React, { useEffect } from 'react';
import './Home.sass';
import useAuth from '../../useAuth';
import { Switch, Route, BrowserRouter, useHistory } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from '../../store/actions/userActions';

// Components
import SearchResults from '../SearchResults/SearchResults';
import Navbar from '../../Components/Navbar/Navbar';
import Player from '../../Components/Player/Player';
import Playlists from '../Playlists/Playlists';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Message from '../../Components/Message/Message';

// Views
import Artist from '../Artist/Artist';
import Collection from '../Collection/Collection';

const Landing: React.FC<{ code: string }> = ({ code }) => {
  const history = useHistory();
  // const accessToken = useAuth(code); // Prod
  const { accessToken } = useSelector((state: any) => state.accessToken); // Dev
  const dispatch = useDispatch();

  // Search
  const searchResults = useSelector((state: any) => state.searchResults);

  useEffect(() => {
    // Top condition is for prod
    if (!accessToken) return;
    // For dev
    // if (!accessToken) return history.push('/');
    dispatch(setUserAction(accessToken));
  }, [accessToken]);

  return (
    <BrowserRouter>
      <div className='landing'>
        <div className='landing__body'>
          <Navbar />
          <section className='main-section'>
            <SearchBar />
            {/* Hide every route when there are search results */}
            {!searchResults?.tracks?.hasOwnProperty('tracks') ? (
              <Switch>
                <Route exact path='/' component={Playlists} />
                <Route path='/artist/:artist' component={Artist} />
                <Route path='/collection/albums/:id' component={Collection} />
                <Route
                  path='/collection/playlists/:id'
                  component={Collection}
                />
              </Switch>
            ) : (
              <SearchResults searchResults={searchResults} />
            )}
          </section>
        </div>
        <Message />
        {accessToken && <Player accessToken={accessToken} />}
      </div>
    </BrowserRouter>
  );
};

export default Landing;
