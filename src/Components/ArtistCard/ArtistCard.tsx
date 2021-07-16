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
        <div className='artistCard__image-container'>
          <div className='artistCard__image-container--inner'>
            <img
              // Placehlder image if playlist doesn't have one
              src={
                artist?.images[2]?.url ||
                artist?.images[0]?.url ||
                PlaceholderImage
              }
            />
          </div>
        </div>
        <h1 className='artistCard-container__name' onClick={clearSearchBar}>
          {artist.name}
        </h1>
      </div>
    </Link>
  );
};

export default Artist;
