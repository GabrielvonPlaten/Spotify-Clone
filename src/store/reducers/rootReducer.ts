import { combineReducers } from 'redux';

import { accessTokenReducer } from './accessTokenReducer';
import { setUserDataReducer } from './userReducer';
import { setRecentlyPlayedTracksReducer } from './tracksReducers';

const rootReducer = combineReducers({
  accessToken: accessTokenReducer,
  userData: setUserDataReducer,
  recentlyPlayedTracks: setRecentlyPlayedTracksReducer,
});

export default rootReducer;
