import {
  SET_COLLECTION,
  SET_ARTIST_ALBUMS,
  setCollection,
  setArtistAlbums,
} from '../types';

const collectionInitialState = {
  collection: {},
};

const artistAlbumsInitialState = {
  albums: {},
};

export const collectionReducer = (
  state = collectionInitialState,
  action: setCollection,
) => {
  switch (action.type) {
    case SET_COLLECTION:
      return {
        collection: action.payload,
      };
    default:
      return state;
  }
};

export const artistAlbumsReducer = (
  state = artistAlbumsInitialState,
  action: setArtistAlbums,
) => {
  switch (action.type) {
    case SET_ARTIST_ALBUMS:
      return {
        albums: action.payload,
      };
    default:
      return state;
  }
};
