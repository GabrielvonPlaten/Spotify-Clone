import SpotifyWebApi from 'spotify-web-api-node';
import { DELETE_SEARCH, SET_SEARCH } from '../types';

const spotifyApi = new SpotifyWebApi();

export const setSearchAction = (searchString: string) => async (
  dispatch: any,
) => {
  spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

  if (searchString !== '') {
    // Search tracks
    try {
      const res = await spotifyApi.searchTracks(searchString);
      dispatch({
        type: SET_SEARCH,
        payload: res.body,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    dispatch({
      type: DELETE_SEARCH,
    });
  }
};
