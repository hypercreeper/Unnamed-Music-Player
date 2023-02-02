var SpotifyUserData;
fetch('/login/auth')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    SpotifyUserData = data;
    document.getElementById("pfpimg").src = SpotifyUserData["images"][0]["url"];
    document.getElementById("pfpimg").title = SpotifyUserData["display_name"] + " | " + SpotifyUserData["email"];
      fetch('https://api.spotify.com/v1/users/' + SpotifyUserData["id"] + "/playlists", {method: "GET",headers: new Headers({'Authorization': "Bearer " + SpotifyUserData["token"]})})
      .then(response2 => response2.json())
      .then(data2 => {
        console.log(data2);
        for(var i = 0; i < data2["items"].length; i++) {
            var img = document.createElement("img");
            var playlistitem = document.createElement("div");
            try {
              img.src = data2["items"][i]["images"][0]["url"];
            } catch (TypeError) {
              
            }
            // img.style.minHeight = "64";
            img.style.maxHeight = document.getElementById("referencer").clientHeight;
            var playlistTitle = document.createElement("b");
            playlistTitle.innerText = data2["items"][i]["name"];
            playlistTitle.style.display = "inline-block";
            playlistTitle.style.overflow = "hidden";
            playlistTitle.style.width = "125px";
            playlistTitle.style.marginLeft = "10px";
            playlistTitle.style.textOverflow = "ellipsis";
            playlistTitle.style.marginBottom = "-15px";
            playlistTitle.style.fontSize = "20px";
            var playlistSubTitle = document.createElement("span");
            playlistSubTitle.innerText = data2["items"][i]["owner"]["display_name"];
            playlistSubTitle.style.display = "inline-block";
            playlistSubTitle.style.overflow = "hidden";
            playlistSubTitle.style.width = "125px";
            playlistSubTitle.style.marginLeft = "10px";
            playlistSubTitle.style.textOverflow = "ellipsis";
            playlistSubTitle.style.marginBottom = "-15px";
            playlistitem.style.display = "flex";
            playlistitem.style.alignItems = "center";
            playlistitem.classList.add("playlistListItem");
            playlistitem.appendChild(img);
            var downdiv = document.createElement("div");
            downdiv.appendChild(playlistTitle);
            downdiv.appendChild(document.createElement("br"));
            downdiv.appendChild(document.createElement("br"));
            downdiv.appendChild(document.createElement("br"));
            downdiv.appendChild(playlistSubTitle);
            // playlistitem.appendChild(playlistTitle);
            playlistitem.appendChild(downdiv);
            document.getElementsByClassName("playlistListContainer")[0].appendChild(playlistitem);
            var imggradient = document.createElement("div");
            imggradient.style.position = "absolute";
            imggradient.style.top = img.offsetTop + "px";
            imggradient.style.left = img.offsetLeft + "px";
            imggradient.style.height = img.clientHeight + "px";
            imggradient.style.width = img.clientWidth+0 + "px";
            imggradient.style.background = "-webkit-linear-gradient(0deg, transparent, #c36daa)";
            imggradient.style.background = "linear-gradient(90deg, transparent, #c36daa)";
            playlistitem.appendChild(imggradient);
        }
        initSpotifyPlayer();
    })
      .catch(error => console.error(error));

})
  .catch(error => console.error(error));
