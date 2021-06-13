import { combineReducers } from 'redux';

import { urlCodeReducer } from './urlCodeReducer';
import { accessTokenReducer } from './accessTokenReducer';

const rootReducer = combineReducers({
  code: urlCodeReducer,
  accessToken: accessTokenReducer,
});

export default rootReducer;
