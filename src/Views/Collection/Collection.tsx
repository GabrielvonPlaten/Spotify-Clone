import React, { useState, useEffect } from 'react';
import './Collection.sass';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setCollectionAction } from '../../store/actions/collectionAction';

// Components
import TrackList from '../../Components/TrackList/TrackList';

interface AlbumPropsInterface {
  params: {
    id: string;
  };
}

const AlbumPlaylist: React.FC<{ match: AlbumPropsInterface }> = ({ match }) => {
  const dispatch = useDispatch();
  const [tracks, setTracks] = useState<any>([]);
  const { collection } = useSelector((state: any) => state.collection);

  useEffect(() => {
    dispatch(setCollectionAction(match.params.id));
  }, [match]);

  useEffect(() => {
    if (Object.keys(collection).length > 0) {
      setTracks(collection.tracks.items);
    }
  }, [collection]);

  if (collection !== null) {
    return (
      <div className='collection'>
        <div className='collection__jumbotron'>
          <div className='overflow--hidden'>
            <div
              className='collection__jumbotron__inner'
              style={{
                backgroundImage:
                  Object.keys(collection).length > 0
                    ? `url(${collection.images[0].url}) `
                    : 'none',
              }}
            ></div>
          </div>
          <div className='collection-information'>
            <div className='collection-information__inner'>
              {collection &&
                collection.images &&
                collection.images.length > 0 && (
                  <img src={collection.images[1].url} />
                )}
              <h2>{collection.name}</h2>
              {collection?.release_date && <p>{collection.release_date}</p>}
            </div>
          </div>
        </div>
        {tracks.length > 0 && (
          <TrackList
            tracks={tracks}
            headerTitle='Songs'
            albumImage={collection.images[2].url}
          />
        )}
      </div>
    );
  }

  return (
    <div className='collection'>
      <h1>Loading...</h1>
    </div>
  );
};

export default AlbumPlaylist;
