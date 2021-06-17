export const SET_USER_DATA: string = 'SET_USER_DATA';

export interface setUserData {
  type: typeof SET_USER_DATA;
  payload: {
    display_name: string;
    email: string;
    id: string;
    external_urls: string;
    imageUrl: string;
    product: string;
  };
}
