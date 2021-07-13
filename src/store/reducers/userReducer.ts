import {
  setUserData,
  SET_USER_DATA,
  SET_USER_PLAYLISTS,
  setUserPlaylists,
} from '../types';

const initialState = {
  user: {},
  playlists: <any[]>[],
};

export const setUserDataReducer = (
  state = initialState,
  action: setUserData | setUserPlaylists,
) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case SET_USER_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    default:
      return state;
  }
};
