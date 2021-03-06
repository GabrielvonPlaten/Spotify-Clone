import {
  setRecentlyPlayedTracks,
  SET_RECENTLY_PLAYED_TRACKS,
  SET_PLAYING_TRACK,
  setCurrentPlayingTrack,
  SET_ARTIST_TOP_TRACKS,
  setArtistTopTracks,
} from '../types';

const initialRecentlyPlayedTracksState = {
  tracks: {},
};

const initialCurrentPlayingTrackState = {
  tracksList: <string[]>[],
  trackIndex: 0,
  track: {},
};

const initialArtistTopTracksState = {
  tracks: <any[]>[],
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
        ...state,
        tracksList: action.payload.tracksList,
        trackIndex: action.payload.trackIndex,
        track: action.payload.track,
      };
    default:
      return state;
  }
};

export const setArtistTopTracksReducer = (
  state = initialArtistTopTracksState,
  action: setArtistTopTracks,
) => {
  switch (action.type) {
    case SET_ARTIST_TOP_TRACKS:
      return {
        tracks: action.payload,
      };
    default:
      return state;
  }
};
