import { SET_ACCESS_TOKEN, setAccessToken } from '../types/codeTypes';

const initialState = {
  accessToken: '',
};

export const accessTokenReducer = (
  state = initialState,
  action: setAccessToken,
) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        accessToken: action.accessToken,
      };
    default:
      return state;
  }
};
