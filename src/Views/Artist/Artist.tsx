import React, { useEffect } from 'react';
import './Artist.sass';

// Redux
import { setArtistAction } from '../../store/actions/artistActions';
import { useDispatch, useSelector } from 'react-redux';
import TrackList from '../../Components/TrackList/TrackList';

interface ArtistProps {
  params: {
    artist: string;
  };
}

const Artist: React.FC<{ match: ArtistProps }> = ({ match }) => {
  const dispatch = useDispatch();
  const { artist } = useSelector((state: any) => state.artist);
  const { tracks } = useSelector((state: any) => state.artistTopTracks);

  useEffect(() => {
    dispatch(setArtistAction(match.params.artist));
  }, [match]);

  if (artist?.images) {
    return (
      <div className='artist-container'>
        <div className='artist-jumbotron'>
          <div className='artist-jumbotron__images'>
            <img
              className='artist-jumbotron__images-side'
              src={artist.images[0].url}
            />
            <img
              className='artist-jumbotron__images-middle'
              src={artist.images[0].url}
            />
            <img
              className='artist-jumbotron__images-side'
              src={artist.images[0].url}
            />
          </div>
          <div className='artist-jumbotron__information'>
            <h1 className='artist-jumbotron__information-name'>
              {artist.name}
            </h1>
            <p>{artist.type}</p>
          </div>
        </div>
        <div className='artist-library-container'></div>
        <TrackList tracks={tracks} headerTitle='Top Songs' />
      </div>
    );
  }

  return (
    <div className='artist-container'>
      <h1>Loading...</h1>
    </div>
  );
};

export default Artist;
