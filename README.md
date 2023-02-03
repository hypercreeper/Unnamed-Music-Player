# Unnamed-Music-Player

## About
The Unnamed Music Player is an Spotify Web API and Spotify Web Playback SDK test to learn and figure out how to integrate Spotify to any other projects. 

## Prerequisites
1. Python 3 has to be installed
2. make sure the following modules are installed: 
a. Flask
b. requests
c. base64 (Should be pre-installed)
d. json (Should be pre-installed)

## How to Install
1. First you have to clone this repository to be able to have access. 
2. Extract the files
3. open a terminal or command prompt and change directory to the extracted folder
4. Run the python file: 
#### Windows: `python app.py`

#### Linux/macOS: `python3 app.py`

5. then go to http://localhost:5000 and click on the top right corner to login to your Spotify account
6. press on 'Click to continue' and it should redirect back to the site

## What works
| Feature | Support | Comment |
|----------|----------|----------|
| Access user account | ✅ | The login system is a bit messy, needs some cleanup |
| Get User Playlists | ✅ | Works perfectly but is static (doesn't do anything but show the playlist |
| Web Playback | ✅ | Playback connects succesfully on premium accounts | 
| Web Playback (Sound Test) | ❌ | Not done yet, will be done when i fix the macOS sound issue |
| Web Playback (Direct Playback) | ❌ | Feature not integrated yet and sound test not complete |
