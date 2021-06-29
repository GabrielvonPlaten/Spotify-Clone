import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AlbumCards.sass';

interface AlbumCardProps {
  items: any[];
}

const AlbumCards: React.FC<{ albums: AlbumCardProps }> = ({ albums }) => {
  useEffect(() => {
    console.log(albums);
  }, [albums]);

  return (
    <div className='album-cards'>
      <h2 className='album-cards__title'>Albums</h2>
      <ul>
        {albums.items.map((album: any, index: number) => (
          <Link to={`/collection/${album.id}`} key={index}>
            <li>
              <div className='album-cards__image-container'>
                <img src={album.images[1].url} alt={album.name + '- cover'} />
              </div>
              <div className='album-cards__info'>
                <h3 className='album-cards__info__title'>{album.name}</h3>
                <p className='album-cards__info__date'>{album.release_date}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default AlbumCards;
