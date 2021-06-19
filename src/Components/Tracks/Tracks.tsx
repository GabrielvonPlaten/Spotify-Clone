import React, { useState } from 'react';
import './Tracks.sass';
import PlayButton from '../../Styles/images/play-btn.svg';

import { RecentlyPlayedTracksInterface } from './../../Interfaces/TracksInterface';

const Tracks: React.FC<{
  track: RecentlyPlayedTracksInterface;
  chooseTrack: any;
}> = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
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
