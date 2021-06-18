export const SET_RECENTLY_PLAYED_TRACKS = 'RECENTLY_PLAYED_TRACKS';

export interface setRecentlyPlayedTracks {
  type: typeof SET_RECENTLY_PLAYED_TRACKS;
  payload: {
    tracks: any;
  };
}
