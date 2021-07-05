import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { useSelector } from 'react-redux';
import './SongView.sass';

// Components
import CollectionCards from '../../Components/CollectionCards/CollectionCards';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

const SongView: React.FC = () => {
  const { user } = useSelector((state: any) => state.userData);
  const [collection, setCollection] = useState<any>(null);

  useEffect(() => {
    spotifyApi
      .getUserPlaylists(user.id)
      .then((data: any) => {
        setCollection(data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <div className='songView-container'>
      {collection && (
        <CollectionCards collection={collection} type='playlists' />
      )}
    </div>
  );
};

export default SongView;
