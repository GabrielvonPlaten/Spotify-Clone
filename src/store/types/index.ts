// User
export const SET_USER_DATA: string = 'SET_USER_DATA';

// Artist
export const SET_ARTIST = 'SET_ARTIST';

// Tracks
export const SET_RECENTLY_PLAYED_TRACKS = 'RECENTLY_PLAYED_TRACKS';
export const SET_PLAYING_TRACK = 'SET_PLAYING_TRACK';
export const SET_ARTIST_TOP_TRACKS = 'SET_ARTIST_TOP_TRACKS';

// Albums

// Search
export const SET_SEARCH = 'SET_SEARCH';
export const DELETE_SEARCH = 'DELETE_SEARCH';

// Code
export const SET_ACCESS_TOKEN: string = 'SET_ACCESS_TOKEN';

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
    track: string;
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
    search: {};
  };
}

export interface deleteSearch {
  type: typeof DELETE_SEARCH;
  payload: {
    results: {};
  };
}
