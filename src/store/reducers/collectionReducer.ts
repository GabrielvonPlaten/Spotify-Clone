import { SET_COLLECTION, setAlbum } from '../types';

const initialState = {
  collection: {},
};

export const collectionReducer = (state = initialState, action: setAlbum) => {
  switch (action.type) {
    case SET_COLLECTION:
      return {
        collection: action.payload,
      };
    default:
      return state;
  }
};
