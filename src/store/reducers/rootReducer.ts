import { combineReducers } from 'redux';

import { accessTokenReducer } from './accessTokenReducer';
import { setUserDataReducer } from './userReducer';
import {
  setRecentlyPlayedTracksReducer,
  setCurrentPlayingTrackReducer,
} from './tracksReducers';
import { searchResultsReducer } from './searchReducer';

const rootReducer = combineReducers({
  accessToken: accessTokenReducer,
  userData: setUserDataReducer,
  recentlyPlayedTracks: setRecentlyPlayedTracksReducer,
  playingTrack: setCurrentPlayingTrackReducer,
  searchResults: searchResultsReducer,
});

export default rootReducer;
