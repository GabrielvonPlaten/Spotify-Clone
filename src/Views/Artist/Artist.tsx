import React, { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import './Artist.sass';

// Redux
import { setArtistAction } from '../../store/actions/artistActions';
import { useDispatch } from 'react-redux';

interface ArtistProps {
  params: {
    artist: string;
  };
}

const Artist: React.FC<{ match: ArtistProps }> = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setArtistAction(match.params.artist));
  }, [match]);

  return (
    <div>
      <h1>Artist name</h1>
    </div>
  );
};

export default Artist;
