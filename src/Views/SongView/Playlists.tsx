import React from 'react';
import { useSelector } from 'react-redux';
import './Playlists.sass';

// Components
import CollectionCards from '../../Components/CollectionCards/CollectionCards';

const Playlists: React.FC = () => {
  const { playlists } = useSelector((state: any) => state.userData);
  const collection: any = {
    items: playlists,
  };

  return (
    <div className='library-container'>
      <div className='library-container__playlists'>
        {playlists.length > 0 && (
          <CollectionCards collection={collection} type='playlists' />
        )}
      </div>
    </div>
  );
};

export default Playlists;
