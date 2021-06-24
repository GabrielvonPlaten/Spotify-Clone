import React, { useState, useEffect, useCallback } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import './SearchResults.sass';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

// Components
import Tracks from '../../Components/Tracks/Tracks';

const SearchResults: React.FC<{ searchResults: any }> = ({ searchResults }) => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    let newArr: any = [];
    searchResults.songResults.tracks.items.map((i: any, index: number) => {
      newArr.push(i.artists);
    });

    newArr = newArr.flat(1);
    newArr = [
      ...new Map(newArr.map((item: any) => [item.id, item.id])).values(),
    ];

    spotifyApi
      .getArtists(newArr)
      .then((data) => {
        setArtists([data.body.artists]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchResults]);

  return (
    <div className='searchResults'>
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
