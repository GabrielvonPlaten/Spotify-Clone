import React, { useEffect } from 'react';
import './Artist.sass';

// Redux
import { setSearchAction } from '../../store/actions/searchActions';
import { useDispatch } from 'react-redux';

const Artist: React.FC<{ match: any }> = ({ match }) => {
  return (
    <div>
      <h1>Artist name</h1>
    </div>
  );
};

export default Artist;
