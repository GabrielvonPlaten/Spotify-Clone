import SpotifyWebApi from 'spotify-web-api-node';
import { SET_USER_DATA } from '../types/userTypes';

const spotifyApi = new SpotifyWebApi();

export const setUserAction = (accessToken: string) => async (dispatch: any) => {
  spotifyApi.setAccessToken(accessToken);

  spotifyApi
    .getMe()
    .then((data: any) => {
      dispatch({
        type: SET_USER_DATA,
        payload: {
          country: data.body.country,
          display_name: data.body.display_name,
          email: data.body.email,
          id: data.body.id,
          external_urls: data.body.external_urls.spotify,
          imageUrl: data.body.images[0].url,
          product: data.body.product,
        },
      });
    })
    .catch(() => {
      window.location.href = '/login';
    });
};
