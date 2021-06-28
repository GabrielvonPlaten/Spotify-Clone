import React, { useState, useEffect } from 'react';
import './Player.sass';

// Components
import SpotifyPlayer from 'react-spotify-web-playback';

// Redux
import { setPlayingTrack } from '../../store/actions/tracksActions';
import { useSelector, useDispatch } from 'react-redux';

const Player: React.FC = () => {
  const dispatch = useDispatch();
  const [play, setPlay] = useState<boolean>(false);
  const accessToken = localStorage.getItem('accessToken');
  const { track: playingTrackUri } = useSelector(
    (state: any) => state.playingTrack,
  );

  // Change every time the song selected is changed
  useEffect(() => {
    setPlay(true);
  }, [playingTrackUri]);

  if (!accessToken) return null;
  return (
    <div className='player-container'>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        initialVolume={0.4}
        callback={(state) => {
          if (!state.isPlaying) {
            setPlay(false);
          }
        }}
        // Automatically plays the song after clicking on it
        play={play}
        uris={playingTrackUri.uri ? [playingTrackUri.uri] : []}
        styles={{
          height: '4vh',
          bgColor: '#191A20',
          sliderTrackColor: '#3e444f',
          sliderColor: '#61c8d3',
          sliderHeight: 5,
          sliderHandleColor: '#d7d7d7',
          trackNameColor: '#D2D2D2',
          trackArtistColor: '#B0B0B0',
          color: '#D2D2D2',
        }}
      />
    </div>
  );
};

export default Player;
