import SpotifyWebApi from 'spotify-web-api-node';
import {
  SET_RECENTLY_PLAYED_TRACKS,
  SET_PLAYING_TRACK,
} from '../types/tracksTypes';

const spotifyApi = new SpotifyWebApi();

export const setRecentlyPlayedTracksAction = (accessToken: string) => async (
  dispatch: any,
) => {
  spotifyApi.setAccessToken(accessToken);

  spotifyApi
    .getMyRecentlyPlayedTracks({
      limit: 10,
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

export const setPlayingTrack = (track: any) => async (dispatch: any) => {
  dispatch({
    type: SET_PLAYING_TRACK,
    payload: track,
  });
};
