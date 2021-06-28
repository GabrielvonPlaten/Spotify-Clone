import { setUserData, SET_USER_DATA } from '../types';

const initialState = {
  user: {},
};

export const setUserDataReducer = (
  state = initialState,
  action: setUserData,
) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
