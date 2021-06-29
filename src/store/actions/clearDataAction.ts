import { CLEAR_STATE } from '../types';

export const clearDataAction = () => async (dispatch: any) => {
  dispatch({
    type: CLEAR_STATE,
    payload: {},
  });
};
