import React, { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import PlayButton from '../../Styles/images/play-btn.svg';
import './Artist.sass';

// Redux
import { setPlayingTrack } from '../../store/actions/tracksActions';
import { setArtistAction } from '../../store/actions/artistActions';
import { useDispatch, useSelector } from 'react-redux';

interface ArtistProps {
  params: {
    artist: string;
  };
}

const Artist: React.FC<{ match: ArtistProps }> = ({ match }) => {
  const dispatch = useDispatch();
  const playingTrack = useSelector((state: any) => state.playingTrack);
  const { artist } = useSelector((state: any) => state.artist);
  const { tracks: topTracks } = useSelector(
    (state: any) => state.artistTopTracks,
  );

  useEffect(() => {
    dispatch(setArtistAction(match.params.artist));
  }, [match]);

  const convertMsTime = (time: number) => {
    const minutes: any = Math.floor(time / 60000);
    const seconds: any = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const playTrack = (trackId: string) => {
    dispatch(setPlayingTrack(trackId));
  };

  useEffect(() => {
    console.log(playingTrack);
  }, [playingTrack]);

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
        <div className='library-header'>
          <ul className='artist-top-list'>
            <h2>Top Songs</h2>
            {topTracks.map((track: any, index: number) => (
              <li className='artist-top-list__track' key={index}>
                <p className='list-index'>{index + 1} </p>
                <div className='track-title-image'>
                  <img
                    className='track-title-image__image'
                    src={track.album.images[2].url}
                  />
                  <img
                    className='track-title-image__play-button button-opacity-hover'
                    src={PlayButton}
                    onClick={() => playTrack(track)}
                  />
                  <p
                    className={`${
                      track.uri === playingTrack.track.uri
                        ? 'track-playing-text'
                        : ''
                    } 'track-title-image__title`}
                  >
                    {track.name}
                  </p>
                </div>
                <p className='artist-top-list__album'>{track.album.name}</p>
                <p className='artist-top-list__duration'>
                  {convertMsTime(track.duration_ms)}
                </p>
              </li>
            ))}
          </ul>
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
