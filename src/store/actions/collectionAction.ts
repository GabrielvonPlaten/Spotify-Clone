import SpotifyWebApi from 'spotify-web-api-node';
import { SET_ARTIST_ALBUMS, SET_COLLECTION } from '../types';

const spotifyApi = new SpotifyWebApi();

// Set albums from artist
export const setArtistAlbumsAction = (
  artist: string,
  offsetNumber: number = 0,
) => async (dispatch: any) => {
  spotifyApi.setAccessToken(localStorage.getItem('accessToken'));
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

// Set tracks from an ALBUM into collection
export const setAlbumsAction = (album: string) => async (dispatch: any) => {
  spotifyApi.setAccessToken(localStorage.getItem('accessToken'));
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

// Set tracks from a PLAYLIST into collection
export const setPlaylistsAction = (playlist: string) => async (
  dispatch: any,
) => {
  spotifyApi.setAccessToken(localStorage.getItem('accessToken'));
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
