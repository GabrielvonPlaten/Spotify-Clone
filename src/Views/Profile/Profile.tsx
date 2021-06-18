import React, { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi();

const Profile: React.FC = () => {
  useEffect(() => {
    spotifyApi.setAccessToken(localStorage.getItem('accessToken'));
    spotifyApi
      .getMyRecentlyPlayedTracks({
        limit: 20,
      })
      .then((data) => {
        console.log(data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Hello Profile</h1>
    </div>
  );
};

export default Profile;
