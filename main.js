$(document).ready(initializeApp);

function initializeApp() {
  var newCharacter = new CharacterCreator();
  var groupFinderPage = new GroupFinder();
  $("#gameshop-finder").on("click", showMap);
  $(".exit-button").on("click", hideMap);
  $(".search").on("click", getLatLngByZipcode);
}

function showMap() {
  $(".map-container").removeClass("hidden");
}

function hideMap() {
  $(".map-container").addClass("hidden");
}

  function getLatLngByZipcode() {
    var geocoder = new google.maps.Geocoder();
    var address = $(".zip-code").val();
    var latitude = 0;
    var longitude = 0;
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();
        var results = { lat: latitude, lng: longitude };
        initMap(results);
      } else {
        console.log("Request failed.")
      }
    });
  }

function initMap(response) {

  var searchedZip = { lat: 33.634844, lng: -117.740513 };
  if (response) {
    searchedZip = response;
  }

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: searchedZip
  });

  var request = {
    location: searchedZip,
    radius: '40000',
    query: 'dungeons and dragons'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        getMarker(results[i]);
      }
    }
  }

  function getMarker(place) {
    var marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map
    });

    var infowindow = new google.maps.InfoWindow({
      content: `<h1>${place.name}</h1><div>${place.formatted_address}</div>`
    });

    marker.addListener("click", function(){
      infowindow.open(map, marker);
    })
  }
}
