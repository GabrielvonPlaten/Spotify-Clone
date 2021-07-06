import SpotifyWebApi from 'spotify-web-api-node';
import { SET_ARTIST_ALBUMS, SET_COLLECTION } from '../types';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

export const setAlbumsAction = (album: string) => async (dispatch: any) => {
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

export const setArtistAlbums = (
  artist: string,
  offsetNumber: number = 0,
) => async (dispatch: any) => {
  try {
    const res = await spotifyApi.getArtistAlbums(artist, {
      limit: 14,
      offset: offsetNumber,
    });
    dispatch({
      type: SET_ARTIST_ALBUMS,
      payload: res.body,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setPlaylistsAction = (playlist: string) => async (
  dispatch: any,
) => {
  try {
    const res = await spotifyApi.getPlaylist(playlist);
    dispatch({
      type: SET_COLLECTION,
      payload: res.body,
    });
  } catch (error) {
    console.log(error);
  }
};
