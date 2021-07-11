import React from 'react';
import { Link } from 'react-router-dom';
import PlaceholderImage from '../../Styles/images/placeholder-image.png';
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
    <Link to={`/artist/${artist.id}`} className='artistCard-link'>
      <div className='artistCard-container'>
        <div className='artistCard-container__cover-container'>
          <img
            src={
              artist?.images[2]?.url ||
              artist?.images[0]?.url ||
              PlaceholderImage
            }
          />
        </div>
        <h1 className='artistCard-container__name' onClick={clearSearchBar}>
          {artist.name}
        </h1>
      </div>
    </Link>
  );
};

export default Artist;
