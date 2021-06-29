import SpotifyWebApi from 'spotify-web-api-node';
import { SET_ARTIST_ALBUMS, SET_COLLECTION } from '../types';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

export const setCollectionAction = (album: string) => async (dispatch: any) => {
  try {
    const res = await spotifyApi.getAlbum(album);
    dispatch({
      type: SET_COLLECTION,
      payload: res.body,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setArtistAlbums = (artist: string) => async (dispatch: any) => {
  try {
    const res = await spotifyApi.getArtistAlbums(artist);
    dispatch({
      type: SET_ARTIST_ALBUMS,
      payload: res.body,
    });
  } catch (error) {
    console.log(error);
  }
};