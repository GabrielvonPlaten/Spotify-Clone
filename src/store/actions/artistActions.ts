import SpotifyWebApi from 'spotify-web-api-node';
import { SET_ARTIST } from '../types/artistTypes';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

export const setArtistAction = (artist: string) => async (dispatch: any) => {
  spotifyApi
    .getArtist(artist)
    .then((data: any) => {
      dispatch({
        type: SET_ARTIST,
        payload: data.body,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
