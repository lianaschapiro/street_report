// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .



// will be the center of the map
var myCenter = new google.maps.LatLng(40.7127, -74.0059)

// Describes map we see when loaded
function initialize() {
  var mapProp = {
    center:myCenter,
    zoom:15,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("map"),mapProp);


// This is a marker
  var marker=new google.maps.Marker({
  position:myCenter,
  });

  // Places the markers on the map
  marker.setMap(map);
  // Makes the marker bounce
  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function(){ marker.setAnimation(null); }, 1000);


  // Zoom to 17 on marker click
  google.maps.event.addListener(marker,'click',function() {
    map.setZoom(17);
    map.setCenter(marker.getPosition());
    });

  // This is the infowindow
  var infowindow = new google.maps.InfoWindow({
    content:"Hello World!"
    });

  // Opens infowindow on marker click
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
    });


  // This is a new map with a geocoded address
  var geocoder = new google.maps.Geocoder();

  // This function geocodes the address entered on submit
  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });

}

// This loads the map when the page is loaded.
google.maps.event.addDomListener(window, 'load', initialize);

// This takes an address and geocodes it
function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

