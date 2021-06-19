import { combineReducers } from 'redux';

import { accessTokenReducer } from './accessTokenReducer';
import { setUserDataReducer } from './userReducer';
import {
  setRecentlyPlayedTracksReducer,
  setCurrentPlayingTrackReducer,
} from './tracksReducers';

const rootReducer = combineReducers({
  accessToken: accessTokenReducer,
  userData: setUserDataReducer,
  recentlyPlayedTracks: setRecentlyPlayedTracksReducer,
  playingTrack: setCurrentPlayingTrackReducer,
});

export default rootReducer;
