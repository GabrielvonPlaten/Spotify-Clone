import React, { useState, useEffect } from 'react';
import './Player.sass';

// Components
import SpotifyPlayer from 'react-spotify-web-playback';

// Redux
import { setPlayingTrack } from '../../store/actions/tracksActions';
import { useSelector, useDispatch } from 'react-redux';
import { setMessageAction } from '../../store/actions/messageActions';

const Player: React.FC = () => {
  const dispatch = useDispatch();
  const [play, setPlay] = useState<boolean>(false);
  const { accessToken } = useSelector((state: any) => state.accessToken);
  const { tracksList, trackIndex } = useSelector(
    (state: any) => state.playingTrack,
  );

  // Change every time the song selected is changed
  useEffect(() => {
    setPlay(true);
  }, [tracksList]);

  if (accessToken !== '') {
    return (
      <div className='player-container'>
        <SpotifyPlayer
          token={accessToken}
          showSaveIcon
          initialVolume={0.4}
          callback={(state) => {
            // Dispatch error message if player fails to load
            if (
              state.status === 'ERROR' &&
              state.error !==
                'This functionality is restricted to premium users only'
            ) {
              dispatch(
                setMessageAction(
                  'Something went wrong with the player. Please refresh the website.',
                  'failure',
                ),
              );
            }

            // Update the state when a new track automatically finishes playing
            if (state.type === 'track_update') {
              dispatch(
                setPlayingTrack(
                  tracksList,
                  state.track,
                  tracksList.indexOf(state.track.uri),
                ),
              );
            }

            if (!state.isPlaying) {
              setPlay(false);
            }
          }}
          // Automatically plays the song after clicking on it
          play={play}
          uris={tracksList}
          offset={trackIndex}
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
  }

  return (
    <div className='artist-container'>
      <h1>Loading...</h1>
    </div>
  );
};

export default Player;
