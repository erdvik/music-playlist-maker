const clientId = '54bf2942dc7d4c4694be4d541f1036fd';
const redirectUri = 'http://localhost:3000/';
const spotifyUrl = `https://accounts.spotify.com/authorize?
                        client_id=${clientId}&
                        response_type=token&
                        scope=playlist-modify-public&
                        redirect_uri=${redirectUri}`;

let accessToken = undefined;
let expiresIn = undefined;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (urlAccessToken && urlExpiresIn) {
            accessToken = urlAccessToken[1];
            expiresIn = urlExpiresIn[1];
            window.setTimeout(() => {
                accessToken = '';
            }, expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location = spotifyUrl;
        }
    },

    search(term) {
        const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
        return fetch(searchUrl, {
            headers: {
                Autorization: `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            if (!jsonResponse.tracks) return [];
            return jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }
            })
        })
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris || trackUris.length === 0) return;
        const userUrl = 'https://api.spotify.com/v1/me';
        const headers = {
            Autorization: `Bearer ${accessToken}`
        };
        let userId = undefined;
        let playlistId = undefined;
        fetch(userUrl, {
            headers: headers
        })
        .then(response => response.json())
        .then(jsonResponse => userId = jsonResponse.userId)
        .then(() => {
            const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
            fetch(createPlaylistUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    name: name
                })
            })
            .then(response => response.json())
            .then(jsonResponse => playlistId = jsonResponse.id)
            .then(() => {
                const addPlaylistTracksUri = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
                fetch(addPlaylistTracksUri, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        uris: trackUris
                    })
                });
            })
        })
    }
};

export default Spotify;