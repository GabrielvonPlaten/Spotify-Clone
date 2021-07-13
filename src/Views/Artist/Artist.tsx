import React, { useState, useEffect } from 'react';
import './Artist.sass';

// Redux
import { setArtistAction } from '../../store/actions/artistActions';
import { useDispatch, useSelector } from 'react-redux';
import { setArtistAlbumsAction } from '../../store/actions/collectionAction';
import { clearDataAction } from '../../store/actions/clearDataAction';

// Components
import TrackList from '../../Components/TrackList/TrackList';
import CollectionCards from '../../Components/CollectionCards/CollectionCards';
import SpotifyWebApi from 'spotify-web-api-node';
import ArtistCard from '../../Components/ArtistCard/ArtistCard';

const spotifyApi = new SpotifyWebApi();

interface ArtistPropsInterface {
  params: {
    artist: string;
  };
}

const Artist: React.FC<{ match: ArtistPropsInterface }> = ({ match }) => {
  const dispatch = useDispatch();
  const { artist } = useSelector((state: any) => state.artist);
  const { tracks } = useSelector((state: any) => state.artistTopTracks);
  const [relatedArtists, setRelatedArtists] = useState<any>([]);
  const { albums: collection } = useSelector(
    (state: any) => state.artistAlbums,
  );
  const { accessToken } = useSelector((state: any) => state.accessToken);
  spotifyApi.setAccessToken(accessToken);

  useEffect(() => {
    dispatch(setArtistAction(match.params.artist));
    dispatch(setArtistAlbumsAction(match.params.artist));

    // Get artists related to the current artist
    getRelatedArtist();

    return () => {
      dispatch(clearDataAction());
    };
  }, [match]);

  const getRelatedArtist = async () => {
    // Since this data is only used in this component, I don't feel nessesary to fetch it
    // using redux
    try {
      const res = await spotifyApi.getArtistRelatedArtists(match.params.artist);
      setRelatedArtists(res.body.artists.splice(0, 10));
    } catch (error) {
      console.log(error);
    }
  };

  if (artist || accessToken !== '') {
    return (
      <div className='artist-container'>
        <div className='artist-jumbotron'>
          <div className='artist-jumbotron__images'>
            {/* Not all artist's have a profile picture */}
            {artist?.images?.length > 0 && (
              <>
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
              </>
            )}
          </div>
          <div className='artist-jumbotron__information'>
            <h1 className='artist-jumbotron__information-name'>
              {artist.name}
            </h1>
            <p className='artist-type'>{artist.type}</p>
            <p className='artist-followers'>
              {artist?.followers?.total.toLocaleString()} Followers
            </p>
          </div>
        </div>
        <div className='artist-library-container'>
          <TrackList tracks={tracks} headerTitle='Top Songs' />
          {collection.hasOwnProperty('items') && (
            <CollectionCards
              collection={collection}
              artistId={artist.id}
              type='albums'
            />
          )}
          {/* Related Artists */}
          <section className='artist-similar'>
            <label className='artist-similar__label'>Related Artists</label>
            <div className='artist-similar__items-inline'>
              {relatedArtists.map((artist: any, index: number) => (
                <ArtistCard key={index} artist={artist} />
              ))}
            </div>
          </section>
        </div>
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
