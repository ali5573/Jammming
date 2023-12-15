const clientId = "dc80bff171b442809168f8c70f06a8df";
//const redirectURL = "http://localhost:3000/";
const redirectURL = "https://ali-jammming.surge.sh";
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;
    const urlTokenAcces = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (urlTokenAcces && urlExpiresIn) {
      accessToken = urlTokenAcces[1];
      const expiresIn = Number(urlExpiresIn[1]);

      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);

      // Clearing the URL after the access token expires
      window.history.pushState("Access token", null, "/");

      return accessToken;
    } else {
      const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
      window.location = redirect;
    }
  },

  search(term) {
    accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((t) => ({
          id: t.id,
          name: t.name,
          artist: t.artists[0].name,
          album: t.album.name,
          uri: t.uri,
        }));
      });
  },
  savePlaylistName(name, trackURIs) {
    if (!name || !trackURIs) {
      return;
    }
    let accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userID= "";
    return fetch(`https://api.spotify.com/v1/me`,{
      headers: headers
    })
    .then((response)=>{return response.json();})
    .then((jsonResponse=>{
      userID=jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
        headers: headers,
        method: "POST",
        body: JSON.stringify({name: name}),
      })
      .then((response)=> response.json())
      .then(
        (jsonResponse)=>{
          const playlistID= jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,{
            headers: headers,
            method: "POST",
            body: JSON.stringify({uris: trackURIs}),
          })
        }
      )
    }))


  },
};

export default Spotify;
