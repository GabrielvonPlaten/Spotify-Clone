import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import './SearchResults.sass';

const spotifyApi = new SpotifyWebApi();

// Redux
import { useSelector } from 'react-redux';

// Components
import Tracks from '../../Components/Tracks/Tracks';
import ArtistCard from '../../Components/ArtistCard/ArtistCard';
import CollectionCards from '../../Components/CollectionCards/CollectionCards';

const SearchResults: React.FC<{ searchResults: any }> = ({ searchResults }) => {
  const [artists, setArtists] = useState<{}[]>([]);
  const { tracks: songResults, playlists: playlistsResults } = searchResults;
  const { accessToken } = useSelector((state: any) => state.accessToken);
  spotifyApi.setAccessToken(accessToken);

  useEffect(() => {
    let newArr: any = [];
    songResults.tracks.items.map((i: any) => {
      newArr.push(i.artists);
    });

    // Flat the array by 1, remove duplicates by artist's name and return their id
    newArr = newArr.flat(1);
    newArr = [
      ...new Map(
        // Remove duplicates by their id and return items by their id
        newArr.map((item: any): string[] => [item.id, item.id]),
      ).values(),
    ];

    newArr = newArr.splice(0, 9);

    spotifyApi
      .getArtists(newArr)
      .then((data) => {
        setArtists(data.body.artists);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchResults]);

  return (
    <div className='searchResults'>
      <section className='row-section'>
        <label className='row-section__label'>Artists</label>
        <div className='row-section__items-inline'>
          {artists.map(
            (artist: any, index: number) =>
              artist.images.length > 0 &&
              artist.images[2] && <ArtistCard key={index} artist={artist} />,
          )}
        </div>
      </section>
      <section className='row-section'>
        <label className='row-section__label'>Songs</label>
        <div className='row-section__items-inline'>
          {songResults?.tracks?.items.map((track: any, index: number) => (
            <Tracks key={index} track={track} />
          ))}
        </div>
        {playlistsResults.playlists.hasOwnProperty('items') && (
          <CollectionCards
            collection={playlistsResults.playlists}
            type='playlists'
          />
        )}
      </section>
    </div>
  );
};

export default SearchResults;
