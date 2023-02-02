function initSpotifyPlayer() {
  var spotifyScript = document.createElement("script");
  spotifyScript.src = "https://sdk.scdn.co/spotify-player.js";
  document.head.appendChild(spotifyScript);
window.onSpotifyWebPlaybackSDKReady = () => {
  const token = SpotifyUserData["token"];
  console.log(token);
  const player = new Spotify.Player({
    name: 'Unnamed Music Player',
    getOAuthToken: cb => { cb(token); },
    volume: 1
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error("init error", message); });
  player.addListener('authentication_error', ({ message }) => { console.error("auth error", message); });
  player.addListener('account_error', ({ message }) => { console.error("account error", message); });
  player.addListener('playback_error', ({ message }) => { console.error("playback error", message); });

  // Playback status updates
  player.addListener('player_state_changed', state => { console.log(state); });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect().then(success => {
    if(success) {console.log("%cSpotify Web Playback SDK Online", "color: lime")}
    else {
      console.error("Error occured initializing.");
    }
  });
  document.getElementById("pausePlayButton").onclick = function() {
    console.log("clicked");
  player.getCurrentState().then(playing => {
    console.log(playing)
    if(playing) {
        document.getElementById("pausePlayButton").children[0].src = "/images/Pause.svg";
        console.log(state.track_window.current_track);
    } 
    else {
        document.getElementById("pausePlayButton").children[0].src = "/images/Play.svg";
    }
  });
}
};

}