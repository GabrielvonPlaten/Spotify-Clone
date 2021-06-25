import SpotifyWebApi from 'spotify-web-api-node';
import { DELETE_SEARCH, SET_SEARCH } from '../types/searchTypes';

const spotifyApi = new SpotifyWebApi();

export const setSearchAction = (searchString: string) => async (
  dispatch: any,
) => {
  spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

  if (searchString !== '') {
    // Search tracks
    spotifyApi
      .searchTracks(searchString)
      .then((data: any) => {
        dispatch({
          type: SET_SEARCH,
          payload: data.body,
        });
      })
      .catch((err) => {
        console.log('Searching error.');
      });
  } else {
    dispatch({
      type: DELETE_SEARCH,
    });
  }
};
