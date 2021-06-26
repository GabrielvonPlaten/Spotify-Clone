import React, { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import './Artist.sass';

// Redux
import { setArtistAction } from '../../store/actions/artistActions';
import { useDispatch, useSelector } from 'react-redux';

interface ArtistProps {
  params: {
    artist: string;
  };
}

const Artist: React.FC<{ match: ArtistProps }> = ({ match }) => {
  const dispatch = useDispatch();
  const { artist } = useSelector((state: any) => state.artist);

  useEffect(() => {
    dispatch(setArtistAction(match.params.artist));
  }, [match]);

  useEffect(() => {
    console.log(artist);
  }, [artist]);

  return (
    <div className='artist-container'>
      <h1>Artist name</h1>
    </div>
  );
};

export default Artist;
