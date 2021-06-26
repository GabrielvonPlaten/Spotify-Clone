import { SET_ARTIST, setArtist } from '../types/artistTypes';

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
