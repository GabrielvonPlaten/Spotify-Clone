import { combineReducers } from 'redux';

import { accessTokenReducer } from './accessTokenReducer';
import { setUserDataReducer } from './userReducer';

const rootReducer = combineReducers({
  accessToken: accessTokenReducer,
  userData: setUserDataReducer,
});

export default rootReducer;
