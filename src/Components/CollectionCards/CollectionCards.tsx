import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CollectionCards.sass';

interface CollectionProps {
  items: any[];
}

type PlaylistType = 'playlists';
type AlbumsType = 'albums';

const CollectionCards: React.FC<{
  collection: CollectionProps;
  type: PlaylistType | AlbumsType;
}> = ({ collection, type }) => {
  return (
    <div
      className={`album-cards ${type === 'playlists' && 'playlist-full-width'}`}
    >
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
                    src={
                      type === 'albums'
                        ? item.images[1].url
                        : item.images[0].url
                    }
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
