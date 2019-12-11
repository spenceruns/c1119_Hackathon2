$(document).ready(initializeApp);

function initializeApp() {
  var groupFinderPage = new GroupFinder();
  $("#group-finder").click(groupFinderPage.render);
  var newCharacter = new CharacterCreator();
  $("#gameshop-finder").on("click", showMap);
  $(".map-exit-button").on("click", hideMap);
}

  function showMap() {
    $(".map-container").removeClass("hidden");
  }

function hideMap() {
  $(".map-container").addClass("hidden");
}

function initMap() {
  var shops = [{
    name: "Brookhurst Hobbies",
    link: "http://www.brookhursthobbies.com/",
    coord: {
      lat: 33.785830,
      lng: -117.957950
    }
  },
    {
      name: "The Guild House",
      link: "theguildhousegames.com",
      coord: {
        lat: 33.883260,
        lng: -118.125280
      }
    },
    {
      name: "The War House",
      link: "thewarhouselongbeach.com",
      coord: {
        lat: 33.804270,
        lng: -118.199740
      }
    },
    {
      name: "Thalia Surf Shop",
      link: "thaliasurf.com",
      coord: {
        lat: 33.5356,
        lng: -117.7782
      }
    },
    {
      name: "Alakazam Comics",
      link: "alakazamcomics.com",
      coord: {
        lat: 33.686690,
        lng: -117.857910
      }
    },
    {
      name: "Bashams",
      link: "bashams.com",
      coord: {
        lat: 33.4347,
        lng: -117.6243
      }
    },
    {
      name: "The Game Chest",
      link: "https://www.thegamechest.com/",
      coord: {
        lat: 33.649979,
        lng: -117.743721
      }
    },
    {
      name: "Comic Quest",
      link: "https://comicquest.org/",
      coord: {
        lat: 33.616450,
        lng: -117.708690
      }
    },
    {
      name: "Magic and Monsters",
      link: "http://www.magicandmonsters.com/",
      coord: {
        lat: 33.616720,
        lng: -117.681430
      }
    }]

  var options = {
    zoom: 10,
    center: { lat: 33.6805592, lng: -117.8710307 }
  }

  var map = new google.maps.Map(document.getElementById("map"), options)

  for (var index=0; index < shops.length; index++) {
    getMarker(shops[index].coord, shops[index].name, shops[index].link);
  }

  function getMarker(coord, name, link) {
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });

    var infowindow = new google.maps.InfoWindow({
      content: "<h1>" + name + "</h1>" + "<div>" + link + "</div>",
    });

    marker.addListener("click", function(){
      infowindow.open(map, marker);
    })
  }
}
