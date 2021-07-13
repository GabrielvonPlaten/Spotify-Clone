import SpotifyWebApi from 'spotify-web-api-node';
import { SET_USER_DATA, SET_USER_PLAYLISTS, SET_ACCESS_TOKEN } from '../types';

const spotifyApi = new SpotifyWebApi();

export const setUserAction = (accessToken: string) => async (dispatch: any) => {
  spotifyApi.setAccessToken(accessToken);

  try {
    const res = await spotifyApi.getMe();
    const playlists = await spotifyApi.getUserPlaylists(res.body.id, {
      limit: 50,
    });
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
      playlists: playlists.body.items,
    });
  } catch (error) {
    window.location.href = '/';
  }
};

export const setUserPlaylists = (accessToken: string, userId: string) => async (
  dispatch: any,
) => {
  try {
    spotifyApi.setAccessToken(accessToken);
    const playlists = await spotifyApi.getUserPlaylists(userId, {
      limit: 50,
    });

    dispatch({
      type: SET_USER_PLAYLISTS,
      playlists: playlists.body.items,
    });
  } catch (error) {
    console.log(error);
  }
};
