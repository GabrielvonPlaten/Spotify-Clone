import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { Link } from 'react-router-dom';
import './Navbar.sass';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

// Redux
import { useSelector } from 'react-redux';

// Interface
import { UserInterface } from '../../Interfaces/UserInterface';

const Navbar: React.FC = () => {
  const { user } = useSelector((state: UserInterface) => state.userData);
  const [playlists, setPlaylists] = useState<any>([]);

  useEffect(() => {
    getPlaylists();
  }, [user]);

  const getPlaylists = async () => {
    try {
      const res = await spotifyApi.getUserPlaylists(user.id);
      setPlaylists(res.body.items);
    } catch (error) {
      console.log(console.log(error));
    }
  };

  useEffect(() => {
    console.log(playlists);
  }, [playlists]);

  return (
    <header className='navbar'>
      <div className='user_display'>
        {/* <img className='user_display__avatar' src={userData.imageUrl} /> */}
        <h2 className='user_display__display_name'>{user.display_name}</h2>
        <div>
          <div className='navbar-links'>
            <Link to='/' className='navbar-links__link'>
              Home
            </Link>
          </div>
          <div className='navbar-playlists-container'>
            <label>Your Playlists</label>
            <hr />
            <ul className='navbar-playlists-list'>
              {playlists.length > 0 &&
                playlists.map((item: any, index: number) => (
                  <li key={index}>
                    <Link to={`/collection/playlists/${item.id}`}>
                      <h3>{item.name}</h3>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
