
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
        zoom: 11,
    });
    infoWindow = new google.maps.InfoWindow;   //infoWindow appears to be the actual map.

    // Try HTML5 geolocation.  gets coordinates to set map caneter (pos)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);                     //marks location on map
            infoWindow.setContent('Dungeon Sweet Dungeon');  // is contents of marker
            infoWindow.open(map);                              // holds open marker on map
            map.setCenter(pos);
        }, 
    function () {
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
});
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    console.log("handleLocationError", pos);
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
searchBar();

};

//SearchBox////////////////
function searchBar(){
    console.log("searchBar");
var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(33.35, -117.55),
    new google.maps.LatLng(33.55, -117.75));

var input = document.getElementById('searchTextField');

var searchBox = new google.maps.places.SearchBox(input, {
    bounds: defaultBounds
    });
}

//Display search results on map ////////////////

function initService() {
    var displaySuggestions = function (predictions, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
            return;
        }
        predictions.forEach(function (prediction) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(prediction.description));
            document.getElementById('results').appendChild(li);
        });
    };

    var service = new google.maps.places.AutocompleteService();
    service.getQueryPredictions({ input: 'pizza near LA' }, displaySuggestions);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
        });
    }


// service.findPlaceFromQuery(request, function (results, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             createMarker(results[i]);
//         }

//         map.setCenter(results[0].geometry.location);    //re-centers map on query
//     }
// });


// was at 68    This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

// var map;
// var service;
// var infowindow;

// function initMap() {
//     var losAngeles = new google.maps.LatLng(34, -118);

//     infowindow = new google.maps.InfoWindow();

//     map = new google.maps.Map(
//         document.getElementById('map'), { center: losAngeles, zoom: 12 });

//     var request = {                              // 'request' will go into Query on 24
//         location: losAngeles,
//         query: 'game store',
//         radius: '2000',
//         //fields: ['name', 'geometry'],          //'geometry' refines location and map orientation also requires additional library
//     };                                           // 'name' does not have any obvious function

//     // service = new google.maps.places.PlacesService(map);
//     service.textSearch(request, callback);        // textSearch will return multiple results
// 
