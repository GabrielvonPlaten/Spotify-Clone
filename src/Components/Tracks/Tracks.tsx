import React from 'react';
import './Tracks.sass';

import { RecentlyPlayedTracksInterface } from './../../Interfaces/TracksInterface';

const Tracks: React.FC<{
  track: RecentlyPlayedTracksInterface;
  chooseTrack: any;
}> = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };

  return (
    <div className='track-container' onClick={handlePlay}>
      <img className='track-container__cover' src={track.album.images[1].url} />
      <h3 className='track-container__title'>{track.name}</h3>
      <h4 className='track-container__artists'>{track.artists[0].name}</h4>
    </div>
  );
};

export default Tracks;
