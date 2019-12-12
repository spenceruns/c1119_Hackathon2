//Try HTML5 geolocation.  gets coordinates to set map center (pos)

function latLongLocator(){
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        console.log("Lat", position.coords.latitude);
        console.log("Long", position.coords.longitude);

        infoWindow.setPosition(pos);                     //marks location on map
        infoWindow.setContent('Dungeon Sweet Dungeon');  // is contents of marker
        infoWindow.open(map);                              // holds open marker on map
        map.setCenter(pos);
    }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
    });
}
} 

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
}