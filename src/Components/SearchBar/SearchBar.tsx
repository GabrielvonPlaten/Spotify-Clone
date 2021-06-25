import React, { useEffect, useState } from 'react';
import './SearchBar.sass';
import { useHistory } from 'react-router-dom';

// Redux
import { setSearchAction } from '../../store/actions/searchActions';
import { useDispatch } from 'react-redux';

const SearchBar: React.FC<{ match?: any }> = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchString, setSearchString] = useState<string>('');

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

  // Clear search bar on url change
  useEffect(() => {
    return history.listen(() => {
      setSearchString('');
    });
  }, [history]);

  return (
    <div className='search-container'>
      <div className='search__form form'>
        <div className='form__line' />
        <input
          id='search-input'
          className='form__input'
          onChange={(e) => setSearchString(e.target.value)}
          placeholder='Search'
          value={searchString}
        />
      </div>
    </div>
  );
};

export default SearchBar;
