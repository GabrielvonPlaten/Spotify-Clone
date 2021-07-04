import SpotifyWebApi from 'spotify-web-api-node';
import { SET_ARTIST } from '../types';
import { SET_ARTIST_TOP_TRACKS } from '../types';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

export const setArtistAction = (artist: string) => async (dispatch: any) => {
  try {
    const res = await spotifyApi.getArtist(artist);
    dispatch({
      type: SET_ARTIST,
      payload: res.body,
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const res = await spotifyApi.getArtistTopTracks(artist, 'GB');
    dispatch({
      type: SET_ARTIST_TOP_TRACKS,
      payload: res.body.tracks,
    });
  } catch (error) {
    console.log(error);
  }
};
