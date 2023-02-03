from flask import Flask, send_from_directory, request, Response
import requests as r
import base64
import json
app = Flask(__name__)

data = {}
refresh_token = ""
# Resources
@app.route("/")
def index():
    return send_from_directory("", "index.html")
@app.route("/index.js")
def indexjs():
    return send_from_directory("", "index.js")
@app.route("/spotifyPlayer.js")
def playerjs():
    return send_from_directory("", "spotifyPlayer.js")

@app.route("/images/Play.svg")
def playsvg():
    return send_from_directory("images", "Play.svg")

@app.route("/images/Pause.svg")
def pausesvg():
    return send_from_directory("images", "Pause.svg")

@app.route("/images/Next.svg")
def nextsvg():
    return send_from_directory("images", "Next.svg")

@app.route("/images/Previous.svg")
def prevsvg():
    return send_from_directory("images", "Previous.svg")

# Spotfy Auth
@app.route("/login/auth")
def spotifyauth():
    return json.dumps(data)
        
        
@app.route("/login/auth/token")
def spotifygetauthtoken():
    headers = request.headers
    urlheaders = request.args
    try:
        # WARNING: The redirect_url arg is just used as a security measure, it does not actually redirect
        resp = r.post("https://accounts.spotify.com/api/token?code=" + urlheaders["code"] + "&grant_type=authorization_code&redirect_uri=http://localhost:5000/login/auth/token", headers={"Content-Type": "application/x-www-form-urlencoded", "Authorization": "Basic " + base64.b64encode(b"77e587a9a2644f0eb40fa597371de715:d80711ecb59b4d9a8b7fd42fb1f72606").decode()})
        parsed_data = json.loads(resp.text)
        resp2 = r.get("https://api.spotify.com/v1/me",headers={"Authorization": "Bearer " + parsed_data["access_token"]})
        global data
        data = json.loads(resp2.text)
        data["token"] = parsed_data["access_token"]
        global refresh_token
        refresh_token = parsed_data["refresh_token"]
        return json.dumps(data) + "<br><br><BR>" + resp.text + "<a href='/'>Click to continue</a>"
    except:
        resp = r.post("https://accounts.spotify.com/api/token?code=" + refresh_token + "&grant_type=refresh_token&redirect_uri=http://localhost:5000/login/auth/token", headers={"Content-Type": "application/x-www-form-urlencoded", "Authorization": "Basic " + base64.b64encode(b"77e587a9a2644f0eb40fa597371de715:d80711ecb59b4d9a8b7fd42fb1f72606").decode()})
        parsed_data = json.loads(resp.text)
        resp2 = r.get("https://api.spotify.com/v1/me",headers={"Authorization": "Bearer " + parsed_data["access_token"]})
        # global data
        data = json.loads(resp2.text)
        data["token"] = parsed_data["access_token"]
        # global refresh_token
        refresh_token = parsed_data["refresh_token"]
        spotifygetauthtoken()
    # try:
    #     print("placeholder")
    #     # return "<script>location.href = 'https://accounts.spotify.com/api/token?code=" + urlheaders["code"] + "&redirect_url=http://localhost:5000/login/auth&grant_type=authorization_code'</script>"
    # except Exception as e: 
    #     print(e)
    #     return "Error Occured<br><br>" + str(e)

@app.route("/login")
def spotifyauthstart():
    scopes = "user-read-private user-read-email playlist-read-private playlist-read-collaborative app-remote-control streaming".replace(" ", "%20")
    return "<script>location.href = 'https://accounts.spotify.com/authorize?response_type=code&client_id=77e587a9a2644f0eb40fa597371de715&scope=" + scopes + "&redirect_uri=http://localhost:5000/login/auth/token&show_dialog=true';</script>"


if __name__ == "__main__":
    app.run(debug=True)
