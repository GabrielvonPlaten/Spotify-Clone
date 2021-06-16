import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = (code: string) => {
  const [accessToken, setAccessToken] = useState<any>();
  const [refreshToken, setRefreshToken] = useState<any>();
  const [expiresIn, setExpiresIn] = useState<any>();

  // Send a post request to Login after the user has logged in with their Spotify Account
  useEffect(() => {
    axios
      .post('/api/login', {
        code,
      })
      .then((res: any) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, '/landing');
      })
      // If any error - Send the user back to the home page
      .catch(() => {
        window.location.href = '/';
      });
  }, [code]);

  useEffect(() => {
    if (!accessToken || !expiresIn) return;
    axios
      .post('/api/refresh', {
        refreshToken,
      })
      .then((res) => {
        setAccessToken(res.data.access_token);
        setExpiresIn(res.data.expires_in);
      })
      .catch(() => {
        window.location.href = '/';
      });
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default useAuth;
