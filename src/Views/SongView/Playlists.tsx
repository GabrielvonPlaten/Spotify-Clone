import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { useSelector } from 'react-redux';
import './Playlists.sass';

// Components
import CollectionCards from '../../Components/CollectionCards/CollectionCards';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

const Playlists: React.FC = () => {
  const { playlists } = useSelector((state: any) => state.userData);
  const collection: any = {
    items: playlists,
  };

  return (
    <div className='library-container'>
      <div className='library-container__playlists'>
        {collection && (
          <CollectionCards collection={collection} type='playlists' />
        )}
      </div>
    </div>
  );
};

export default Playlists;
