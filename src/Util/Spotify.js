let userAccessToken;

const clientId = "22a07a1ecf054112a78f793f4149377f";
// const redirectURI = "http://localhost:3000/";
const redirectURI = "https://modest-ritchie-daeeec.netlify.com/";

const Spotify = {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);


    if (accessTokenMatch && expiresInMatch) {
      userAccessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return userAccessToken;
    } else {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },
  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response) => response.json()).then((results) => {
      if (!results.tracks) {
        return [];
      }

      return results.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }))
    });
  },
  savePlaylist(name, trackUri) {
    if (!name || !trackUri.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let usersId;

    return fetch(`https://api.spotify.com/v1/me`, {headers}).then(response => response.json()).then((data) => {
      usersId = data.id;
      return fetch(`https://api.spotify.com/v1/users/${usersId}/playlists`, {
        headers,
        method: 'POST',
        body: JSON.stringify({name})
      }).then(response => response.json()).then(data => {
        const playlistId = data.id;
        return fetch(`https://api.spotify.com/v1/users/${usersId}/playlists/${playlistId}/tracks`, {
          headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUri})
        })
      });
    });
  }
};

export default Spotify;