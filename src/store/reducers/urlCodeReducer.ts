import { SET_URL_CODE, setUrlCode } from '../types/codeTypes';

const initialState = {
  code: '',
};

export const urlCodeReducer = (state = initialState, action: setUrlCode) => {
  switch (action.type) {
    case SET_URL_CODE:
      return {
        code: action.code,
      };
    default:
      return state;
  }
};
