import React from 'react';
import './Login.sass';

// https://gentle-cliffs-53695.herokuapp.com/

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = 'http://localhost:8080/';
const scopes = [
  'streaming',
  'user-top-read',
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-read-recently-played',
  'user-modify-playback-state',
];

const AUTH_URL = encodeURI(
  `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
    '%20',
  )}`,
);

const Login: React.FC = () => {
  return (
    <div className='login-button'>
      <a href={AUTH_URL}>Login with Spotify</a>
    </div>
  );
};

export default Login;
