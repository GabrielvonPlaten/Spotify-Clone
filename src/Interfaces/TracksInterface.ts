export interface RecentlyPlayedTracksInterface {
  recentlyPlayedTracks: {
    tracks: any;
  };

  album: {
    artists: any[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: any[];
    release_date: Date;
    type: string;
  };
  artists: any[];
  disc_number: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
}
