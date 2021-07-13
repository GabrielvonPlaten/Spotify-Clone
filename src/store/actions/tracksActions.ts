import SpotifyWebApi from 'spotify-web-api-node';
import { SET_RECENTLY_PLAYED_TRACKS, SET_PLAYING_TRACK } from '../types';

const spotifyApi = new SpotifyWebApi();

export const setRecentlyPlayedTracksAction = (accessToken: string) => async (
  dispatch: any,
) => {
  spotifyApi.setAccessToken(accessToken);
  try {
    const res = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 10 });
    dispatch({
      type: SET_RECENTLY_PLAYED_TRACKS,
      payload: {
        recentlyPlayedTracks: res.body,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const setPlayingTrack = (
  // Player will automatically play through the array
  tracksArray: string[],
  // The track currently playing
  track: {},
  // Index tells the player where in the collection it should start playing
  index: number,
) => async (dispatch: any) => {
  dispatch({
    type: SET_PLAYING_TRACK,
    payload: {
      tracksList: tracksArray,
      track,
      trackIndex: index,
    },
  });
};
