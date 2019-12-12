// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;
var service;
var infowindow;
var newSpot = null;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 33.45, lng: -117.65 },
        zoom: 5
    });
    infoWindow = new google.maps.InfoWindow;   //infoWindow appears to be the actual map.

    // Try HTML5 geolocation.  gets coordinates to set map caneter (pos)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
    newSpot = pos;
    console.log("pos", newSpot);
    console.log("Lat", position.coords.latitude);
    console.log("Long", position.coords.longitude);

            infoWindow.setPosition(pos);                     //marks location on map
            infoWindow.setContent('Dungeon Sweet Dungeon');  // is contents of marker
            infoWindow.open(map);                              // holds open marker on map
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });

    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    var request = {
        query: 'Getty Center',
        fields: ['name', 'geometry'],
        };

    service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }


}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function createMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  });