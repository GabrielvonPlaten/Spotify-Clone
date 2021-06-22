import {
  SET_SEARCH,
  setSearch,
  DELETE_SEARCH,
  deleteSearch,
} from '../types/searchTypes';

const initialState = {
  results: {},
};

export const searchResultsReducer = (
  state = initialState,
  action: setSearch | deleteSearch,
) => {
  switch (action.type) {
    case SET_SEARCH:
      return {
        results: action.payload,
      };
    case DELETE_SEARCH:
      return {
        results: {},
      };
    default:
      return state;
  }
};
