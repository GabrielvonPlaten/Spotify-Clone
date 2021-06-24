import React from 'react';
import './Artist.sass';

const Artist: React.FC<{ artist: any }> = ({ artist }) => {
  console.log(artist);
  return (
    <div className='artist-container'>
      <div className='artist-container__cover-container'>
        <img src={artist.images[2].url} />
      </div>
      <h1 className='artist-container__name'>{artist.name}</h1>
    </div>
  );
};

export default Artist;
