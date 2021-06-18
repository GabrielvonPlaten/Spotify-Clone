import {
  setRecentlyPlayedTracks,
  SET_RECENTLY_PLAYED_TRACKS,
} from '../types/tracksTypes';

const initialRecentlyPlayedTracksState = {
  tracks: {},
};

export const setRecentlyPlayedTracksReducer = (
  state = initialRecentlyPlayedTracksState,
  action: setRecentlyPlayedTracks,
) => {
  switch (action.type) {
    case SET_RECENTLY_PLAYED_TRACKS:
      return {
        tracks: action.payload,
      };
    default:
      return state;
  }
};
