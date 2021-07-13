import { SET_SEARCH, setSearch, DELETE_SEARCH, deleteSearch } from '../types';

const initialState = {
  tracks: {},
  playlists: {},
};

export const searchResultsReducer = (
  state = initialState,
  action: setSearch | deleteSearch,
) => {
  switch (action.type) {
    case SET_SEARCH:
      const { tracks, playlists } = action.payload;
      return {
        ...state,
        tracks,
        playlists,
      };
    case DELETE_SEARCH:
      return {
        tracks: {},
        playlists: {},
      };
    default:
      return state;
  }
};
