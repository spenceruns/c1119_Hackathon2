

//API_key = AIzaSyAida3l8h8mIi42Ru3iBSFFwmvQqxE_Ib0

//key = API_KEY

    var map;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: new google.maps.LatLng(33.6, -117.7),
            mapTypeId: 'terrain'
        });

        // set the USGS URL as the source.
var script = document.createElement('script');
// This example uses a local copy of the GeoJSON stored at
script.src ='http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp'
// 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
document.getElementsByTagName('head')[0].appendChild(script);
}

// Loop through the results array and place a marker for each
// set of coordinates.
      window.eqfeed_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].geometry.coordinates;
      var latLng = new google.maps.LatLng(coords[1],coords[0]);
          var marker = new google.maps.Marker({
            position: latLng,
    map: map
  });
}
}
    
initMap();



// function initMap() {

//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 5,
//         center: { lat: 33, lng: -118 }
//     });

//     // Create an array of alphabetical characters used to label the markers.
//     var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

//     // Add some markers to the map.
//     // Note: The code uses the JavaScript Array.prototype.map() method to
//     // create an array of markers based on a given "locations" array.
//     // The map() method here has nothing to do with the Google Maps API.
//     var markers = locations.map(function (location, i) {
//         return new google.maps.Marker({
//             position: location,
//             label: labels[i % labels.length]
//         });
//     });

//     // Add a marker clusterer to manage the markers.
//     var markerCluster = new MarkerClusterer(map, markers,
//      { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
// }
// var locations = [
//     { lat: 31.563910, lng: -117.154312 },
//     { lat: 38.718234, lng: -119.363181 },
//     { lat: 39.718234, lng: -119.363181 },
//     { lat: 40.718234, lng: -119.363181 },
//     { lat: 41.718234, lng: -119.363181 },
// ]