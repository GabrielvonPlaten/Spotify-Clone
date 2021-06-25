import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './ArtistCard.sass';

// Redux
import { setSearchAction } from '../../store/actions/searchActions';
import { useDispatch } from 'react-redux';

const Artist: React.FC<{ artist: any }> = ({ artist }) => {
  const dispatch = useDispatch();

  const clearSearchBar = () => {
    dispatch(setSearchAction(''));
  };

  return (
    <div className='artist-container'>
      <div className='artist-container__cover-container'>
        <img src={artist.images[2].url} />
      </div>
      <Link to={`/artist/${artist.id}`}>
        <h1 className='artist-container__name' onClick={clearSearchBar}>
          {artist.name}
        </h1>
      </Link>
    </div>
  );
};

export default Artist;
