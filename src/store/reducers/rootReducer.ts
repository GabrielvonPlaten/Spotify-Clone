import { combineReducers } from 'redux';

import { accessTokenReducer } from './accessTokenReducer';
import { setUserDataReducer } from './userReducer';
import {
  setRecentlyPlayedTracksReducer,
  setCurrentPlayingTrackReducer,
} from './tracksReducers';
import { searchResultsReducer } from './searchReducer';
import { artistReducer } from './artistsReducer';

const rootReducer = combineReducers({
  accessToken: accessTokenReducer,
  userData: setUserDataReducer,
  recentlyPlayedTracks: setRecentlyPlayedTracksReducer,
  playingTrack: setCurrentPlayingTrackReducer,
  searchResults: searchResultsReducer,
  artist: artistReducer,
});

export default rootReducer;
