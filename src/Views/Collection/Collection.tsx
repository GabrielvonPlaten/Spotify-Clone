import React, { useState, useEffect } from 'react';
import './Collection.sass';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setCollectionAction } from '../../store/actions/collectionAction';
import { clearDataAction } from '../../store/actions/clearDataAction';

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
  const [fontSize, setFontSize] = useState('');
  const { collection } = useSelector((state: any) => state.collection);

  useEffect(() => {
    dispatch(setCollectionAction(match.params.id));
  }, [match]);

  useEffect(() => {
    if (Object.keys(collection).length > 0) {
      setTracks(collection.tracks.items);
    }
  }, [collection]);

  useEffect(() => {
    return () => dispatch(clearDataAction());
  }, []);

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
            {collection &&
              collection.images &&
              collection.images.length > 0 && (
                <img src={collection.images[1].url} />
              )}
          </div>
        </div>
        {tracks.length > 0 && (
          <TrackList
            tracks={tracks}
            headerTitle={collection.name}
            releaseDate={collection.release_date}
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
