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
import { setMessageAction } from '../../store/actions/messageActions';
import { setUserPlaylists } from '../../store/actions/userActions';

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
  const { user, playlists } = useSelector((state: any) => state.userData);
  const routeArray = location.pathname.split('/');

  useEffect(() => {
    // This view uses both /collection/albums/ and /collection/playlists/
    // Dispatch the correct collection type depending on the url type
    if (routeArray[2] === 'albums') {
      dispatch(setAlbumsAction(match.params.id));
    } else if (routeArray[2] === 'playlists') {
      dispatch(setPlaylistsAction(match.params.id));
    }
    // Playlists updates the headerTitle
  }, [match, playlists]);

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

  // Change playlist name
  const changePlaylistName = async (e: any) => {
    e.preventDefault();

    try {
      const res = await spotifyApi.changePlaylistDetails(collection.id, {
        name: e.target[0].value,
      });
      dispatch(setMessageAction("Playlist's name updated.", 'success'));
      // Update the user's playlist in the state
      // Thus updating the navbar
      dispatch(setUserPlaylists(user.id));
    } catch (error) {
      dispatch(
        setMessageAction('The ame was not able to be updated.', 'failure'),
      );
    }
  };

  useEffect(() => {
    return () => dispatch(clearDataAction());
  }, []);

  if (Object.keys(collection).length > 0) {
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
            changePlaylistName={changePlaylistName}
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
