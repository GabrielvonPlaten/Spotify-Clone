import { SET_MESSAGE, HIDE_MESSAGE } from '../types';

type Status = 'success' | 'failure';

export const setMessageAction = (message: string, status: Status) => async (
  dispatch: any,
) => {
  dispatch({
    type: SET_MESSAGE,
    payload: {
      message,
      status,
    },
  });

  setTimeout(() => dispatch({ type: HIDE_MESSAGE }), 4000);
};
