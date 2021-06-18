import SpotifyWebApi from 'spotify-web-api-node';
import { SET_RECENTLY_PLAYED_TRACKS } from '../types/tracksTypes';

const spotifyApi = new SpotifyWebApi();

export const setRecentlyPlayedTracksAction = (accessToken: string) => async (
  dispatch: any,
) => {
  spotifyApi.setAccessToken(accessToken);

  spotifyApi
    .getMyRecentlyPlayedTracks({
      limit: 20,
    })
    .then((data) => {
      dispatch({
        type: SET_RECENTLY_PLAYED_TRACKS,
        payload: {
          recentlyPlayedTracks: data.body,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
