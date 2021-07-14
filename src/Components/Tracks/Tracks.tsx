import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Tracks.sass';
import PlayButton from '../../Styles/images/play-btn.svg';

// Redux
import { useDispatch } from 'react-redux';
import { setPlayingTrack } from '../../store/actions/tracksActions';

import { TracksInterface } from './../../Interfaces/TracksInterface';

const Tracks: React.FC<{
  track: TracksInterface;
}> = ({ track }) => {
  const dispatch = useDispatch();
  const handlePlay = () => {
    dispatch(setPlayingTrack([track.uri], track, 0));
  };

  return (
    <div className='track-container'>
      <div className='poster-container'>
        {track.album?.images.length === 0 ? (
          <img
            className='poster-container__cover'
            alt={track.name + '- cover'}
          />
        ) : (
          <img
            className='poster-container__cover'
            src={track.album?.images[1].url}
            alt={track.name + '- cover'}
          />
        )}
        <img
          className='poster-container__play-button'
          src={PlayButton}
          onClick={handlePlay}
        />
      </div>
      <Link to={`/collection/albums/${track.album.id}`}>
        <h3 className='track-container__title'>{track.name}</h3>
      </Link>
      <Link to={`/artist/${track.artists[0].id}`}>
        <h4 className='track-container__artists'>{track.artists[0].name}</h4>
      </Link>
    </div>
  );
};

export default Tracks;
