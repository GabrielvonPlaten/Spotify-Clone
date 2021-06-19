import {
  setRecentlyPlayedTracks,
  SET_RECENTLY_PLAYED_TRACKS,
  SET_PLAYING_TRACK,
  setCurrentPlayingTrack,
} from '../types/tracksTypes';

const initialRecentlyPlayedTracksState = {
  tracks: {},
};

const initialCurrentPlayingTrackState = {
  track: {},
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

export const setCurrentPlayingTrackReducer = (
  state = initialCurrentPlayingTrackState,
  action: setCurrentPlayingTrack,
) => {
  switch (action.type) {
    case SET_PLAYING_TRACK:
      return {
        track: action.payload,
      };
    default:
      return state;
  }
};
