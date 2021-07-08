import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CollectionCards.sass';

// Redux
import { useDispatch } from 'react-redux';
import { setArtistAlbumsAction } from '../../store/actions/collectionAction';

import PlaceholderImage from '../../Styles/images/placeholder-image.png';

interface CollectionProps {
  items: any;
  total: number;
}

type PlaylistType = 'playlists';
type AlbumsType = 'albums';

const CollectionCards: React.FC<{
  collection: CollectionProps;
  type: PlaylistType | AlbumsType;
  artistId?: string;
}> = ({ collection, type, artistId }) => {
  const dispatch = useDispatch();
  const [offsetNumber, setOffsetNumber] = useState<number>(0);

  // Arrow buttons update the offset which increases or decreases the offset
  // Offset is used to return the paginated results from the API
  useEffect(() => {
    if (typeof artistId !== 'undefined') {
      dispatch(setArtistAlbumsAction(artistId, offsetNumber));
    }
  }, [offsetNumber]);

  useEffect(() => {
    return () => setOffsetNumber(0);
  }, []);

  return (
    <div
      className={`album-cards ${type === 'playlists' && 'playlist-full-width'}`}
    >
      {type === 'albums' && (
        <div>
          <button
            disabled={offsetNumber <= 0}
            // Change the offset by a diff of 14
            // This is because the fetch function has a limit of in CollectionAction
            onClick={() => setOffsetNumber(offsetNumber - 14)}
          >
            {' < '}
          </button>
          <button
            disabled={offsetNumber >= collection.total}
            onClick={() => setOffsetNumber(offsetNumber + 14)}
          >
            {' > '}
          </button>
        </div>
      )}
      <h2 className='album-cards__title'>{type}</h2>
      <ul>
        {collection.items.map((item: any, index: number) => (
          <Link to={`/collection/${type}/${item.id}`} key={index}>
            <li>
              <div className='album-cards__image-container'>
                <div className='album-cards__image-container--inner'>
                  <img
                    className={`${
                      type === 'playlists' && 'playlist-image-size'
                    }`}
                    // Placehlder image if playlist doesn't have one
                    src={item?.images[0]?.url || PlaceholderImage}
                    alt={item.name + '- cover'}
                  />
                </div>
              </div>
              <div className='album-cards__info'>
                <h3 className='album-cards__info__title'>{item.name}</h3>
                <p className='album-cards__info__date'>{item.release_date}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CollectionCards;
