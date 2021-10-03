import {
  SET_COLLECTION,
  SET_ARTIST_ALBUMS,
  setCollection,
  setArtistAlbums,
  CLEAR_STATE,
  clearState,
  SHOW_PLAYLIST_MODAL,
  HIDE_PLAYLIST_MODAL,
  showPlaylistModal,
  hidePlaylistModal,
} from '../types';

const collectionInitialState = {
  collection: {},
};

const artistAlbumsInitialState = {
  albums: {},
};

const playlistModalInitialState = {
  show: false,
};

export const collectionReducer = (
  state = collectionInitialState,
  action: setCollection | clearState,
) => {
  switch (action.type) {
    case SET_COLLECTION:
      return {
        collection: action.payload,
      };
    case CLEAR_STATE:
      return {
        collection: {},
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

export const displayPlaylistModalReducer = (
  state = playlistModalInitialState,
  action: showPlaylistModal | hidePlaylistModal,
) => {
  switch (action.type) {
    case SHOW_PLAYLIST_MODAL:
      return {
        show: true,
      };
    case HIDE_PLAYLIST_MODAL:
      return {
        show: false,
      };
    default:
      return state;
  }
};
