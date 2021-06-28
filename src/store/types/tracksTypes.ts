export const SET_RECENTLY_PLAYED_TRACKS = 'RECENTLY_PLAYED_TRACKS';
export const SET_PLAYING_TRACK = 'SET_PLAYING_TRACK';

export const SET_ARTIST_TOP_TRACKS = 'SET_ARTIST_TOP_TRACKS';

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
