import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SET_ACCESS_TOKEN } from './store/types';
import axios from 'axios';

const useAuth = (code: string) => {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState<any>();
  const [refreshToken, setRefreshToken] = useState<any>();
  const [expiresIn, setExpiresIn] = useState<any>();

  // Send a post request to Login after the user has logged in with their Spotify Account
  useEffect(() => {
    if (code) {
      axios
        .post('/api/login', {
          code,
        })
        .then((res: any) => {
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(res.data.expiresIn);

          localStorage.setItem('accessToken', res.data.accessToken);

          dispatch({
            type: SET_ACCESS_TOKEN,
            payload: {
              accessToken,
            },
          });
          window.history.pushState({}, null, '/');
        })
        // If any error - Send the user back to the home page
        .catch(() => {
          window.location.href = '/';
        });
    } else if (!localStorage.getItem('accessToken')) {
      window.location.href = '/';
    }
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post('/api/refresh', {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location.href = '/';
        });
    }, (expiresIn - 1) * 1);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default useAuth;
