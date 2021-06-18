import React from 'react';
import './Tracks.sass';

import { RecentlyPlayedTracksInterface } from './../../Interfaces/TracksInterface';

const Tracks: React.FC<{ track: RecentlyPlayedTracksInterface }> = ({
  track,
}) => {
  console.log(track);

  return (
    <div className='track-container'>
      <img className='track-cover' src={track.album.images[1].url} />
      <h3 className='track-title'>{track.name}</h3>
      <h4 className='track-artists'>{track.artists[0].name}</h4>
    </div>
  );
};

export default Tracks;
