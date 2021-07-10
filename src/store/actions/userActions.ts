import SpotifyWebApi from 'spotify-web-api-node';
import { SET_USER_DATA, SET_USER_PLAYLISTS } from '../types';

const spotifyApi = new SpotifyWebApi();

export const setUserAction = (accessToken: string) => async (dispatch: any) => {
  spotifyApi.setAccessToken(accessToken);

  try {
    const res = await spotifyApi.getMe();
    const playlists = await spotifyApi.getUserPlaylists(res.body.id);
    dispatch({
      type: SET_USER_DATA,
      payload: {
        country: res.body.country,
        display_name: res.body.display_name,
        email: res.body.email,
        id: res.body.id,
        external_urls: res.body.external_urls.spotify,
        imageUrl: res.body.images[0].url,
        product: res.body.product,
      },
    });
    dispatch({
      type: SET_USER_PLAYLISTS,
      payload: playlists.body.items,
    });
  } catch (error) {
    window.location.href = '/';
  }
};

export const setUserPlaylists = (userId: string) => async (dispatch: any) => {
  try {
    const playlists = await spotifyApi.getUserPlaylists(userId);
    dispatch({
      type: SET_USER_PLAYLISTS,
      payload: playlists.body.items,
    });
  } catch (error) {
    console.log(error);
  }
};
