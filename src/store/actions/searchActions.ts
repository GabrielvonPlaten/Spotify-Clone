import SpotifyWebApi from 'spotify-web-api-node';
import { DELETE_SEARCH, SET_ARTIST, SET_SEARCH } from '../types';

const spotifyApi = new SpotifyWebApi();

export const setSearchAction = (searchString: string) => async (
  dispatch: any,
) => {
  spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

  if (searchString !== '') {
    // Search tracks and playlists
    try {
      const tracksResponse = await spotifyApi.searchTracks(searchString, {
        limit: 20,
      });
      const playlistResponse = await spotifyApi.searchPlaylists(searchString);
      dispatch({
        type: SET_SEARCH,
        payload: {
          tracks: tracksResponse.body,
          playlists: playlistResponse.body,
        },
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
