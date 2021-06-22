import React, { useEffect, useState } from 'react';
import './SearchBar.sass';

// Redux
import { setSearchAction } from '../../store/actions/searchActions';
import { useDispatch } from 'react-redux';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState<string>('');
  const [loadingText, setLoadingText] = useState<boolean>(false);

  useEffect(() => {
    if (searchString !== '') {
      const typingTimer = setTimeout(
        () => dispatch(setSearchAction(searchString)),
        1000,
      );
      return () => clearTimeout(typingTimer);
    } else {
      dispatch(setSearchAction(''));
    }
  }, [searchString]);

  return (
    <div className='search-container'>
      <div className='search__form form'>
        <div className='form__line' />
        <input
          id='search-input'
          className='form__input'
          onChange={(e) => setSearchString(e.target.value)}
          placeholder='Search'
        />
      </div>
    </div>
  );
};

export default SearchBar;
