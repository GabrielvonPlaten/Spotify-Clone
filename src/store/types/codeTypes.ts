export const SET_URL_CODE: string = 'SET_URL_CODE';
export const SET_ACCESS_TOKEN: string = 'SET_ACCESS_TOKEN';

export interface setUrlCode {
  type: typeof SET_URL_CODE;
  code: string;
}

export interface setAccessToken {
  type: typeof SET_ACCESS_TOKEN;
  accessToken: string;
}
