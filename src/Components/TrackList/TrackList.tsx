import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './TrackList.sass';
import SpotifyWebApi from 'spotify-web-api-node';
import PlayButton from '../../Styles/images/play-btn.svg';
import { Link } from 'react-router-dom';
import SymbolPlus from '../../Styles/images/symbol-plus.svg';
import SymbolMinus from '../../Styles/images/symbol-minus.svg';

const spotifyApi = new SpotifyWebApi();

// Redux
import { setPlayingTrack } from '../../store/actions/tracksActions';
import { setMessageAction } from '../../store/actions/messageActions';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylistsAction } from '../../store/actions/collectionAction';
import { setUserPlaylists } from '../../store/actions/userActions';

const TrackList: React.FC<{
  tracks: any[];
  headerTitle: string;
  albumImage?: string;
  releaseDate?: string;
  // The types below are needed to show the 'remove track' button
  fromCollectionType?: string;
  playlistInfo?: {
    id: string;
    snapshotId: string;
    user: any;
    collaborative?: boolean;
  };
  changePlaylistName?: (e: any) => void;
  match?: any;
}> = ({
  tracks,
  headerTitle,
  albumImage,
  releaseDate,
  fromCollectionType,
  playlistInfo,
  changePlaylistName,
  match,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const playingTrack = useSelector((state: any) => state.playingTrack);
  const { playlists, user } = useSelector((state: any) => state.userData);
  const [displayEditName, setDisplayEditName] = useState<boolean>(false);
  const { accessToken } = useSelector((state: any) => state.accessToken);
  const [displayOptions, setDisplayOptions] = useState(false);
  spotifyApi.setAccessToken(accessToken);

  // Play the selected track and set the entire list of tracks into a redux state
  const setPlayTrack = (track: any, trackList: any, index: number) => {
    let newArr: any[] = [];
    newArr = [
      ...new Map(
        // Remove duplicates by their uri and return items by their uri
        trackList.map((item: any): string[] => [item.uri, item.uri]),
      ).values(),
    ];

    dispatch(setPlayingTrack(newArr, track, index));
  };

  const convertMsTime = (time: number): string => {
    const minutes: any = Math.floor(time / 60000);
    const seconds: any = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Add track to playlist
  const addTrackToPlaylist = async (playlistId: string, trackUri: string) => {
    try {
      await spotifyApi.addTracksToPlaylist(playlistId, [trackUri]);

      dispatch(setUserPlaylists(accessToken, user.id)); // Updates the playlist view
      dispatch(setMessageAction('Track added to playlist!', 'success'));
    } catch (error) {
      dispatch(
        setMessageAction('Track could not be added to playlist.', 'failure'),
      );
    }
  };

  // Remove track from playlist
  const removeTrackFromPlaylist = async (trackUri: string) => {
    const track = [{ uri: trackUri }];
    const options = { snapshot_id: playlistInfo.snapshotId };

    try {
      await spotifyApi.removeTracksFromPlaylist(
        playlistInfo.id,
        track,
        options,
      );
      dispatch(setMessageAction('Track removed from playlist.', 'success'));
      dispatch(setUserPlaylists(accessToken, user.id)); // Updates the playlist view
      dispatch(setPlaylistsAction(playlistInfo.id)); // Update the list
    } catch (error) {
      dispatch(setMessageAction('Track could not be removed.', 'failure'));
    }
  };

  // Hide edit name input
  useEffect(() => {
    return () => setDisplayEditName(false);
  }, [playlistInfo]);

  // TODO: Desaturate tracklist or show warning if the song is not available to play
  // Use available_markets to check if the song is available
  const removePlaylist = async () => {
    try {
      await spotifyApi.unfollowPlaylist(playlistInfo.id);
      history.push('/');
      dispatch(setMessageAction('Playlist removed', 'success'));
      dispatch(setUserPlaylists(accessToken, user.id));
    } catch (error) {
      dispatch(setMessageAction('Playlist could not be removed', 'failure'));
    }
  };

  const displayPlaylistOptions = () => {
    setDisplayOptions(!displayOptions);
  };

  return (
    <div className='track-list-container'>
      <h2 className='header-title'>
        <span
          style={{
            cursor:
              fromCollectionType === 'playlist' &&
              user.id === playlistInfo.user.id &&
              'pointer',
          }}
          className='header-title__title'
          onClick={() => {
            fromCollectionType === 'playlist' &&
              setDisplayEditName(!displayEditName);
          }}
        >
          {headerTitle}
        </span>
        {releaseDate && <span className='release-date'> - {releaseDate}</span>}
        {fromCollectionType === 'playlist' && (
          <div className='playlist-options'>
            <button
              className='playlist-options__displayBtn'
              onClick={displayPlaylistOptions}
            >
              <div className='dots'>...</div>
            </button>
            {displayOptions && (
              <div className='playlist-options--popover'>
                <ul>
                  <li>
                    <button onClick={removePlaylist}>
                      <p>Remove Playlist</p>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </h2>
      {displayEditName && user.id === playlistInfo.user.id && (
        <div className='playlist-name-edit'>
          <form onSubmit={(e) => changePlaylistName(e)}>
            <input type='text' name='name' placeholder='Edit name' />
          </form>
        </div>
      )}
      <ul>
        {tracks.map((track: any, index: number, trackList) => (
          <li
            key={index}
            className={`track-list-item ${
              // Highlights the track item when the selected track is being played
              track.id === playingTrack.track.id ? 'track-playing-bg' : ''
            }`}
          >
            <p className='list-index'>{index + 1}</p>
            <div className='track-title-image'>
              <div className='track-image-box'>
                {track.album ? (
                  <div
                    className='track-image-box__image'
                    style={{
                      backgroundImage: `url(${track.album.images[2].url})`,
                    }}
                  ></div>
                ) : (
                  <div
                    className='track-image-box__image'
                    style={{ backgroundImage: `url(${albumImage})` }}
                  ></div>
                )}
                {/* Display play button on hover */}
                <img
                  className='track-image-box__play-button button-opacity-hover'
                  src={PlayButton}
                  onClick={() => setPlayTrack(track, trackList, index)}
                />
              </div>
              <p
                className={` track-title-image__title ${
                  // Highlights the track item when the selected track is being played
                  track.id === playingTrack.track.id ? 'track-playing-text' : ''
                }`}
              >
                {track.name}
              </p>
            </div>
            {track.album ? (
              <div style={{ margin: 'auto 0' }}>
                <Link
                  to={`/collection/albums/${track.album.id}`}
                  className='track-list-item__album'
                >
                  {track.album.name}
                </Link>
              </div>
            ) : (
              //  Display artists if user is in collection router
              <div style={{ margin: 'auto 0' }}>
                {track.artists.map((artist: any, index: number) => (
                  <Link
                    to={`/artist/${artist.id}`}
                    key={index}
                    className='track-list-item__artist'
                  >
                    {artist.name}
                  </Link>
                ))}
              </div>
            )}
            {/* Track options */}
            <div className='track-list-item__options'>
              {/* "Remove track button" is only visible IF! */}
              {/* It's a playlist that is collaborative or the user owns it */}
              {fromCollectionType === 'playlist' &&
                (user.id === playlistInfo.user.id ||
                  playlistInfo.collaborative) && (
                  <div className='minus-icon onhover-display'>
                    <img
                      src={SymbolMinus}
                      onClick={() => removeTrackFromPlaylist(track.uri)}
                    />
                  </div>
                )}
              <div className='plus-icon'>
                <img src={SymbolPlus} />
                <div className='track-options--popover'>
                  <ul>
                    <label>Add to Playlist</label>
                    <hr />
                    {playlists &&
                      playlists.map((playlist: any, index: number) => (
                        <li
                          key={index}
                          onClick={() =>
                            addTrackToPlaylist(playlist.id, track.uri)
                          }
                        >
                          <p>{playlist.name}</p>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <p className='track-list-item__duration'>
              {convertMsTime(track.duration_ms)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;
