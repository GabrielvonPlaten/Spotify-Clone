import React, { useState } from 'react';
import './Tracks.sass';
import PlayButton from '../../Styles/images/play-btn.svg';

// Redux
import { useDispatch } from 'react-redux';
import { setPlayingTrack } from '../../store/actions/setTracksActions';

import { RecentlyPlayedTracksInterface } from './../../Interfaces/TracksInterface';

const Tracks: React.FC<{
  track: RecentlyPlayedTracksInterface;
}> = ({ track }) => {
  const dispatch = useDispatch();
  const handlePlay = () => {
    dispatch(setPlayingTrack(track));
  };

  return (
    <div className='track-container'>
      <div className='poster-container'>
        <img
          className='poster-container__cover'
          src={track.album.images[1].url}
        />
        <img
          className='poster-container__play-button'
          src={PlayButton}
          onClick={handlePlay}
        />
      </div>
      <h3 className='track-container__title'>{track.name}</h3>
      <h4 className='track-container__artists'>{track.artists[0].name}</h4>
    </div>
  );
};

export default Tracks;
