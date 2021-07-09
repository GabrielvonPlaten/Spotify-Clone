import React, { useEffect } from 'react';
import './TrackList.sass';
import SpotifyWebApi from 'spotify-web-api-node';
import PlayButton from '../../Styles/images/play-btn.svg';
import { Link } from 'react-router-dom';
import SymbolPlus from '../../Styles/images/symbol-plus.svg';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

// Redux
import { setPlayingTrack } from '../../store/actions/tracksActions';
import { setMessageAction } from '../../store/actions/messageActions';
import { useDispatch, useSelector } from 'react-redux';

const TrackList: React.FC<{
  tracks: any[];
  headerTitle: string;
  albumImage?: string;
  releaseDate?: string;
}> = ({ tracks, headerTitle, albumImage, releaseDate }) => {
  const dispatch = useDispatch();
  const playingTrack = useSelector((state: any) => state.playingTrack);
  const { playlists } = useSelector((state: any) => state.userData);

  const playTrack = (track: any, trackList: any, index: number) => {
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

  const addTrackToPlaylist = async (playlistId: string, trackUri: string) => {
    try {
      const res = await spotifyApi.addTracksToPlaylist(playlistId, [trackUri]);

      dispatch(setMessageAction('Track added to playlist!', 'success'));
    } catch (error) {
      dispatch(
        setMessageAction('Track could not be added to playlist.', 'failure'),
      );
    }
  };

  // TODO: Desaturate tracklist or show warning if the song is not available to play
  // Use available_markets to check if the song is available

  return (
    <ul className='track-list-container'>
      <h2 className='header-title'>
        {headerTitle}
        {releaseDate && <span className='release-date'> - {releaseDate}</span>}
      </h2>
      {tracks.map((track: any, index: number, trackList) => (
        <li key={index} className='track-list-item'>
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
                onClick={() => playTrack(track, trackList, index)}
              />
            </div>
            <p
              className={` track-title-image__title ${
                track.name === playingTrack.track.name
                  ? 'track-playing-text'
                  : ''
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
                  key={index}
                  className='track-list-item__artist'
                  to={`/artist/${artist.id}`}
                >
                  {artist.name}
                </Link>
              ))}
            </div>
          )}
          {/* Track options */}
          <div className='track-list-item__options'>
            <img src={SymbolPlus} />
            <div className='track-list-item__options--popover'>
              <ul>
                <label>Add to Playlist</label>
                <hr />
                {playlists &&
                  playlists.map((playlist: any, index: number) => (
                    <li
                      key={index}
                      onClick={() => addTrackToPlaylist(playlist.id, track.uri)}
                    >
                      <p>{playlist.name}</p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <p className='track-list-item__duration'>
            {convertMsTime(track.duration_ms)}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default TrackList;
