// User
export const SET_USER_DATA = 'SET_USER_DATA';

// Artist
export const SET_ARTIST = 'SET_ARTIST';

// Tracks
export const SET_RECENTLY_PLAYED_TRACKS = 'RECENTLY_PLAYED_TRACKS';
export const SET_PLAYING_TRACK = 'SET_PLAYING_TRACK';
export const SET_ARTIST_TOP_TRACKS = 'SET_ARTIST_TOP_TRACKS';

// Collection
export const SET_COLLECTION = 'SET_COLLECTION';
export const SET_ARTIST_ALBUMS = 'SET_ARTIST_ALBUMS';
export const SET_USER_PLAYLISTS = 'SET_USER_PLAYLISTS';
export const SHOW_PLAYLIST_MODAL = 'SHOW_PLAYLIST_MODAL';
export const HIDE_PLAYLIST_MODAL = 'HIDE_PLAYLIST_MODAL';

// Search
export const SET_SEARCH = 'SET_SEARCH';
export const DELETE_SEARCH = 'DELETE_SEARCH';

// Code
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

// CLEAR DATA
export const CLEAR_STATE = 'CLEAR_DATA';

// MESSAGE
export const SET_MESSAGE = 'SET_MESSAGE';
export const HIDE_MESSAGE = 'HIDE_MESSAGE';

export interface setAccessToken {
  type: typeof SET_ACCESS_TOKEN;
  payload: {
    accessToken: string;
  };
}

export interface setArtist {
  type: typeof SET_ARTIST;
  payload: {
    artist: {};
  };
}

export interface setUserData {
  type: typeof SET_USER_DATA;
  payload: {
    country: string;
    display_name: string;
    email: string;
    id: string;
    external_urls: string;
    imageUrl: string;
    product: string;
  };
}

export interface setRecentlyPlayedTracks {
  type: typeof SET_RECENTLY_PLAYED_TRACKS;
  payload: {
    tracks: any;
  };
}

export interface setCurrentPlayingTrack {
  type: typeof SET_PLAYING_TRACK;
  payload: {
    tracksList: string[];
    trackIndex: number;
    track: {};
  };
}

export interface setArtistTopTracks {
  type: typeof SET_ARTIST_TOP_TRACKS;
  payload: {
    tracks: any;
  };
}

export interface setSearch {
  type: typeof SET_SEARCH;
  payload: {
    tracks: {};
    playlists: {};
  };
}

export interface deleteSearch {
  type: typeof DELETE_SEARCH;
  payload: {
    results: {};
  };
}

export interface setCollection {
  type: typeof SET_COLLECTION;
  payload: {
    collection: {};
  };
}

export interface setArtistAlbums {
  type: typeof SET_ARTIST_ALBUMS;
  payload: {
    albums: any[];
  };
}

export interface clearState {
  type: typeof CLEAR_STATE;
  payload: {};
}

export interface setUserPlaylists {
  type: typeof SET_USER_PLAYLISTS;
  playlists: any[];
}

export interface setMessage {
  type: typeof SET_MESSAGE;
  payload: {
    message: string;
    status: string;
    show: boolean;
  };
}

export interface hideMessage {
  type: typeof HIDE_MESSAGE;
}

export interface showPlaylistModal {
  type: typeof SHOW_PLAYLIST_MODAL;
}

export interface hidePlaylistModal {
  type: typeof HIDE_PLAYLIST_MODAL;
}
