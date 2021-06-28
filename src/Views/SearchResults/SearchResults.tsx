import React, { useState, useEffect, useCallback } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import './SearchResults.sass';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

// Components
import Tracks from '../../Components/Tracks/Tracks';
import ArtistCard from '../../Components/ArtistCard/ArtistCard';

const SearchResults: React.FC<{ searchResults: any }> = ({ searchResults }) => {
  const [artists, setArtists] = useState<{}[]>([]);

  useEffect(() => {
    let newArr: any = [];
    searchResults.songResults.tracks.items.map((i: any, index: number) => {
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
          {searchResults?.songResults?.tracks?.items.map(
            (track: any, index: number) => (
              <Tracks key={index} track={track} />
            ),
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResults;
