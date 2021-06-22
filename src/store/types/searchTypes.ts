export const SET_SEARCH = 'SET_SEARCH';
export const DELETE_SEARCH = 'DELETE_SEARCH';

export interface setSearch {
  type: typeof SET_SEARCH;
  payload: {
    search: {};
  };
}

export interface deleteSearch {
  type: typeof DELETE_SEARCH;
  payload: {
    results: {};
  };
}
