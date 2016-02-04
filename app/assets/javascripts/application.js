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

// Describes map we see when loaded
function initialize() {
  var myCenter = new google.maps.LatLng(40.7127, -74.0059)
  var mapProp = {
    center:myCenter,
    zoom:15,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("map"),mapProp);
  // defines new info window for user defined area
  var infoWindow = new google.maps.InfoWindow({map: map});
//HTML5 geolocation. finds user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } 
  else {
    // if Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

 // This is a marker
  var marker=new google.maps.Marker({
  position:myCenter,
  });

//   // Places the markers on the map
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

// This takes an address and geocodes it. Code is from Google Maps Javascript API
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


// ######### REPORT MODAL ############

function openReportModal() {
  $('.report_outer_modal').fadeIn(200);
}

function closeReportModal() {
  $('.report_outer_modal').fadeOut(200);
}
