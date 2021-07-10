import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { useLocation } from 'react-router-dom';
import PlaceholderImage from '../../Styles/images/placeholder-image.png';
import './Collection.sass';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setAlbumsAction,
  setPlaylistsAction,
} from '../../store/actions/collectionAction';
import { clearDataAction } from '../../store/actions/clearDataAction';

// Components
import TrackList from '../../Components/TrackList/TrackList';

interface AlbumPropsInterface {
  params: {
    id: string;
  };
}

const AlbumPlaylist: React.FC<{ match: AlbumPropsInterface }> = ({ match }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [tracks, setTracks] = useState<any>([]);
  const { collection } = useSelector((state: any) => state.collection);
  const { message } = useSelector((state: any) => state.message);
  const routeArray = location.pathname.split('/');

  useEffect(() => {
    // This view uses both /collection/albums/ and /collection/playlists/
    // Dispatch the correct collection type depending on the url type
    if (routeArray[2] === 'albums') {
      dispatch(setAlbumsAction(match.params.id));
    } else if (routeArray[2] === 'playlists') {
      dispatch(setPlaylistsAction(match.params.id));
    }
  }, [match]);

  useEffect(() => {
    if (Object.keys(collection).length > 0 && collection.type === 'album') {
      setTracks(collection.tracks.items);
    }

    if (Object.keys(collection).length > 0 && collection.type === 'playlist') {
      // Playlist's tracks are nested one layer deeper than a regular album
      // Loop through the items array and push the track object
      // Otherwise the TrackList won't work
      let tracksArray: any[] = [];
      collection.tracks.items.map((item: any) => {
        tracksArray.push(item.track);
      });

      setTracks(tracksArray);
    }
  }, [collection]);

  useEffect(() => {
    return () => dispatch(clearDataAction());
  }, []);

  if (collection !== null) {
    return (
      <div className='collection'>
        <div className='collection__jumbotron'>
          <div className='overflow--hidden'>
            <div
              className='collection__jumbotron__inner'
              style={{
                backgroundImage:
                  Object.keys(collection).length > 0 &&
                  `url(${collection?.images[0]?.url ?? PlaceholderImage}) `,
              }}
            ></div>
          </div>
          <div className='collection-information'>
            <img
              src={
                collection.images && collection.images[0]
                  ? collection.images[0].url
                  : PlaceholderImage
              }
            />
          </div>
        </div>
        {tracks.length > 0 && (
          <TrackList
            tracks={tracks}
            headerTitle={collection.name}
            releaseDate={collection.release_date}
            albumImage={collection?.images[0]?.url ?? PlaceholderImage}
            fromCollectionType={collection.type}
            playlistInfo={
              collection.type === 'playlist' && {
                id: collection.id,
                snapshotId: collection.snapshot_id,
                user: collection.owner,
                collaborative: collection.collaborative,
              }
            }
          />
        )}
      </div>
    );
  }

  return (
    <div className='collection'>
      <h1>Loading...</h1>
    </div>
  );
};

export default AlbumPlaylist;
