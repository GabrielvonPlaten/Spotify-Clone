import { SHOW_PLAYLIST_MODAL, HIDE_PLAYLIST_MODAL } from '../types';

type DisplayStatus = 'show' | 'hide';

// Action when creating a new playlist
export const setPlaylistModalAction = (displayStatus: DisplayStatus) => async (
  dispatch: any,
) => {
  if (displayStatus === 'show') {
    dispatch({
      type: SHOW_PLAYLIST_MODAL,
    });
  } else {
    dispatch({
      type: HIDE_PLAYLIST_MODAL,
    });
  }
};
