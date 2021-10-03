import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { Link, useLocation } from 'react-router-dom';
import SymbolPlus from '../../Styles/images/symbol-plus.svg';
import PlaceholderImage from '../../Styles/images/placeholder-image.png';
import './Navbar.sass';

const spotifyApi = new SpotifyWebApi();

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Interface
import { UserInterface } from '../../Interfaces/UserInterface';
import { setMessageAction } from '../../store/actions/messageActions';
import { setUserPlaylists } from '../../store/actions/userActions';

const Navbar: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [locationId, setLocationId] = useState<string>('');
  const { user, playlists } = useSelector((state: any) => state.userData);
  const { accessToken } = useSelector((state: any) => state.accessToken);
  spotifyApi.setAccessToken(accessToken);

  useEffect(() => {
    const routeArray = location.pathname.split('/');

    if (routeArray.length === 4) return setLocationId(routeArray[3]);
    return setLocationId('');
  }, [location]);

  const createPlaylistHandler = async () => {
    try {
      await spotifyApi.createPlaylist(`My Playlist ${playlists.length + 1}`, {
        description: 'My description',
        public: true,
      });
      dispatch(setMessageAction('Playlist created!', 'success'));
      dispatch(setUserPlaylists(accessToken, user.id));
    } catch (error) {
      dispatch(setMessageAction('Playlist could not be created.', 'failure'));
    }
  };

  return (
    <header className='navbar'>
      <div className='user_display'>
        {Object.keys(user).length > 0 && (
          <>
            <img
              className='user_display__avatar'
              src={
                (user && user?.images && user?.images[0]?.url) ||
                PlaceholderImage
              }
            />
            <h2 className='user_display__display_name'>{user.display_name}</h2>
          </>
        )}
      </div>
      <div className='navbar-links'>
        <Link to='/' className='navbar-links__link'>
          Home
        </Link>
      </div>
      <div className='navbar-buttons'>
        <img src={SymbolPlus} />
        <button onClick={createPlaylistHandler}>Create Playlist</button>
      </div>
      <div className='navbar-playlists-container'>
        <label>Your Playlists</label>
        <hr />
        <ul className='navbar-playlists-list'>
          {playlists.length > 0 &&
            playlists.map((item: any, index: number) => (
              <li key={index}>
                <Link
                  to={`/collection/playlists/${item.id}`}
                  className={`${
                    locationId === item.id ? 'activePlaylist' : ''
                  }`}
                >
                  <h3>{item.name}</h3>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
