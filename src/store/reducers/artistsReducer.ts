import { SET_ARTIST, setArtist, CLEAR_STATE, clearState } from '../types';

const initialArtistState = {
  artist: {},
};

export const artistReducer = (
  state = initialArtistState,
  action: setArtist | clearState,
) => {
  switch (action.type) {
    case SET_ARTIST:
      return {
        artist: action.payload,
      };
    case CLEAR_STATE:
      return {
        artist: {},
      };
    default:
      return state;
  }
};
