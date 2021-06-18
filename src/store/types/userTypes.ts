export const SET_USER_DATA: string = 'SET_USER_DATA';

export interface setUserData {
  type: typeof SET_USER_DATA;
  payload: {
    country: string;
    display_name: string;
    email: string;
    id: string;
    external_urls: string;
    imageUrl: string;
    product: string;
  };
}
