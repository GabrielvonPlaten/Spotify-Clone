import SpotifyWebApi from 'spotify-web-api-node';
import { SET_USER_DATA, SET_USER_PLAYLISTS, SET_ACCESS_TOKEN } from '../types';
import { setMessageAction } from './messageActions';

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
      payload: res.body,
    });

    dispatch({
      type: SET_USER_PLAYLISTS,
      playlists: playlists.body.items,
    });
  } catch (error) {
    dispatch(
      setMessageAction(
        'ERROR: Unable to retrieve profile information.',
        'failure',
      ),
    );
    // window.location.href = '/';
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
