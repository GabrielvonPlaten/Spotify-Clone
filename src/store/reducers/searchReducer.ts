import { SET_SEARCH, setSearch, DELETE_SEARCH, deleteSearch } from '../types';

const initialState = {
  songResults: {},
};

export const searchResultsReducer = (
  state = initialState,
  action: setSearch | deleteSearch,
) => {
  switch (action.type) {
    case SET_SEARCH:
      return {
        songResults: action.payload,
      };
    case DELETE_SEARCH:
      return {
        songResults: {},
      };
    default:
      return state;
  }
};
