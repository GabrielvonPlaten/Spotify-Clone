import { combineReducers } from 'redux';

import { accessTokenReducer } from './accessTokenReducer';
import { setUserDataReducer } from './userReducer';
import {
  setRecentlyPlayedTracksReducer,
  setCurrentPlayingTrackReducer,
  setArtistTopTracksReducer,
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
  artistTopTracks: setArtistTopTracksReducer,
});

export default rootReducer;
