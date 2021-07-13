import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.sass';

const spotifyApi = new SpotifyWebApi();

// Redux
import { useSelector } from 'react-redux';

// Interface
import { UserInterface } from '../../Interfaces/UserInterface';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user } = useSelector((state: UserInterface) => state.userData);
  const [locationId, setLocationId] = useState<string>('');
  const { playlists } = useSelector((state: any) => state.userData);
  const { accessToken } = useSelector((state: any) => state.accessToken);
  spotifyApi.setAccessToken(accessToken);

  useEffect(() => {
    const routeArray = location.pathname.split('/');

    if (routeArray.length === 4) return setLocationId(routeArray[3]);
    return setLocationId('');
  }, [location]);

  return (
    <header className='navbar'>
      <div className='user_display'>
        <img className='user_display__avatar' src={user.imageUrl} />
        <h2 className='user_display__display_name'>{user.display_name}</h2>
      </div>
      <div className='navbar-links'>
        <Link to='/' className='navbar-links__link'>
          Home
        </Link>
      </div>
      {/* <div className='navbar-links'>
          <button>Create Playlist</button>
        </div> */}
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
