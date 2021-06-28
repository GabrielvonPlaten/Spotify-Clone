import { SET_ARTIST, setArtist } from '../types';

const initialArtistState = {
  artist: {},
};

export const artistReducer = (
  state = initialArtistState,
  action: setArtist,
) => {
  switch (action.type) {
    case SET_ARTIST:
      return {
        artist: action.payload,
      };
    default:
      return state;
  }
};
