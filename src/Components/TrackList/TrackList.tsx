import React from 'react';
import './TrackList.sass';
import SpotifyWebApi from 'spotify-web-api-node';
import PlayButton from '../../Styles/images/play-btn.svg';

// Redux
import { setPlayingTrack } from '../../store/actions/tracksActions';
import { useDispatch, useSelector } from 'react-redux';

const TrackList: React.FC<{ tracks: any[]; headerTitle: string }> = ({
  tracks,
  headerTitle,
}) => {
  const dispatch = useDispatch();
  const playingTrack = useSelector((state: any) => state.playingTrack);
  const playTrack = (trackId: string) => {
    dispatch(setPlayingTrack(trackId));
  };

  const convertMsTime = (time: number): string => {
    const minutes: any = Math.floor(time / 60000);
    const seconds: any = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  console.log(tracks);

  return (
    <ul className='track-list-container'>
      <h2>{headerTitle}</h2>
      {tracks.map((track: any, index: number) => (
        <li className='track-list-item'>
          <p className='list-index'>{index + 1}</p>
          <div className='track-title-image'>
            <img
              className='track-title-image__image'
              src={track.album.images[2].url}
            />
            <img
              className='track-title-image__play-button button-opacity-hover'
              src={PlayButton}
              onClick={() => playTrack(track)}
            />
            <p
              className={`${
                track.uri === playingTrack.track.uri ? 'track-playing-text' : ''
              } 'track-title-image__title`}
            >
              {track.name}
            </p>
          </div>
          <p className='track-list-item__album'>{track.album.name}</p>
          <p className='track-list-item__duration'>
            {convertMsTime(track.duration_ms)}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default TrackList;
