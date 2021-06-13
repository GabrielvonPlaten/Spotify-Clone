import React from 'react';
import './Login.module.sass';

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = 'http://localhost:8080/landing';

const AUTH_URL = encodeURI(
  `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state`,
);

const Login: React.FC = () => {
  return (
    <div>
      <a href={AUTH_URL}>Login with Spotify</a>
    </div>
  );
};

export default Login;
