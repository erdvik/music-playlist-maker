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

    }
}

export default Spotify;