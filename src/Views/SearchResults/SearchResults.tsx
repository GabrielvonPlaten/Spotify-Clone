import React from 'react';
import './SearchResults.sass';

// Components
import Tracks from '../../Components/Tracks/Tracks';

const SearchResults: React.FC<{ searchResults: any }> = ({ searchResults }) => {
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
    </div>
  );
};

export default SearchResults;
