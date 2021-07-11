import { SET_MESSAGE, setMessage, HIDE_MESSAGE, hideMessage } from '../types';

const initialState = {
  message: '',
  status: '',
  show: false,
};

export const messageReducer = (
  state = initialState,
  action: setMessage | hideMessage,
) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        message: action.payload.message,
        status: action.payload.status,
        show: true,
      };
    case HIDE_MESSAGE:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};
