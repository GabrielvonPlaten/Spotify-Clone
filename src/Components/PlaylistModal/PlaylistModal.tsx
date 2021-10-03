import React from 'react';
import './PlaylistModal.sass';

// Redux
import { useSelector } from 'react-redux';

const PlaylistModal = () => {
  const { show } = useSelector((state: any) => state.playlistModal);

  return (
    <div className={`PlaylistModal ${show && 'PlaylistModal-on'}`}>
      <p>Commodo incididunt aliqua deserunt esse elit fugiat fugiat.</p>
      <div className='PlaylistModal__buttons'>
        <button className='PlaylistModal__create'>Crete Playlist</button>
        <button className='PlaylistModal__cancel'>Cancel</button>
      </div>
    </div>
  );
};

export default PlaylistModal;
