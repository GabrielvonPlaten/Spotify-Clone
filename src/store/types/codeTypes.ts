export const SET_ACCESS_TOKEN: string = 'SET_ACCESS_TOKEN';

export interface setAccessToken {
  type: typeof SET_ACCESS_TOKEN;
  payload: {
    accessToken: string;
  };
}
