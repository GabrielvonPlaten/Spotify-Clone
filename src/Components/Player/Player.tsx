import React, { useState, useEffect } from 'react';
import './Player.sass';

// Components
import SpotifyPlayer from 'react-spotify-web-playback';

const Player: React.FC<any> = ({ trackUri }) => {
  const [play, setPlay] = useState<boolean>(false);
  const accessToken = localStorage.getItem('accessToken');

  // Change every time the song selected is changed
  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;
  return (
    <div className='player-container'>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
        }}
        // Automatically plays the song after clicking on it
        play={play}
        uris={trackUri ? [trackUri] : []}
      />
    </div>
  );
};

export default Player;
