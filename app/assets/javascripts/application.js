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
    zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("map"),mapProp);
  // defines new info window for user defined area
  // var infoWindow = new google.maps.InfoWindow({map: map});
  // HTML5 geolocation. finds user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    });
  } 

  // This is a marker
  var marker = new google.maps.Marker({
    // position:myCenter,
  });

  // Places the marker on the map
  // marker.setMap(map);

  // Makes the marker bounce
  // marker.setAnimation(google.maps.Animation.BOUNCE);
  // setTimeout(function(){ marker.setAnimation(null); }, 1000);


  // Zoom to 17 on marker click
  google.maps.event.addListener(marker,'click',function() {
    map.setZoom(15);
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

  // Click on map to set marker
  //   map.addListener('click', function(e) {
  //     placeMarkerAndPanTo(e.latLng, map);
  //   });

  // function placeMarkerAndPanTo(latLng, map) {
  //   var marker = new google.maps.Marker({
  //     position: latLng,
  //     map: map,
      
  //   });
  //   map.panTo(latLng);
  // }

  // This is a new map with a geocoded address
  var geocoder = new google.maps.Geocoder();

  // This function geocodes the address entered on submit in report modal
  document.getElementById('submit').addEventListener('click', function() {
    var address = document.getElementById("address").value;
    // document.getElementById("submit").setAttribute("value", "Address Found!");
    geocodeAddress(geocoder, map, address);
  });

  //grabs all of the things with the class load_all_markers
  var things = document.getElementsByClassName('load_all_markers');
    // console.log(things)
  // gets the length of load_all_markers
  var length = document.getElementsByClassName('load_all_markers').length
    // console.log(length)
    
  var arr = [];
  var arrTitle = []
  var arrBody = []
  var arrDetails = []
  // iterates through things array and adds it to empty arr (dataset.thang refers to html attributte data-thang)
  for (var i = 0; i < length; i++){
    arr.push(things[i].dataset.thang);
    arrTitle.push(things[i].dataset.title);
    arrBody.push(things[i].dataset.body);
    arrDetails.push(things[i].dataset.details);
  }
  // arr is now an array of objects in string form
  // console.log(arr)
  // console.log(arrTitle)

  // iteration of arr and returning it's object form using JSON.parse saved as variable "thung"
  for (var j = 0; j < length; j++){
    // console.log(j)
    var thung = JSON.parse(arr[j]);
    var rTitle = arrTitle[j];
    var rBody = arrBody[j];
    var rDetails = arrDetails[j];

    // console.log(thung)
    console.log(rTitle)
    console.log(rBody)

    // make new marker with the object thung which contains latitude and longitude
    var marks = new google.maps.Marker({
      position: thung,
      map: map
    });
    var infoWindow = new google.maps.InfoWindow({
        content: "<b>" + rTitle + "</b><br><br>" + rBody + "<br>" + rDetails
    });
    google.maps.event.addListener(marks, 'click', function () {
        infoWindow.open(map, this);
        map.setZoom(15);
        map.setCenter(marks.getPosition());
    });
    map.setCenter(thung);
  }
}

// This takes an address and geocodes it. Code is from Google Maps Javascript API
function geocodeAddress(geocoder, resultsMap, address) {
  // var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      console.log(results[0].geometry.location)
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      /// coordinates
      var report_lng = marker.position.lng();
      var report_lat = marker.position.lat();
      // setting hidden form_for fields to the coordinates
      document.getElementById("report_Lng").setAttribute("value", report_lng); 
      document.getElementById("report_Lat").setAttribute("value", report_lat);
      document.getElementById("submit").setAttribute("value", "Address Found!");
      // Search button display shows "Search" after three seconds.
      setTimeout(function(){ 
        document.getElementById("submit").setAttribute("value", "Search"); }, 3000);
      // console.log(marker.position.lat())
      // console.log(marker.position.lng())
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}


// ######### REPORT MODAL ############

function openReportModal() {
  $('#report_outer_modal').fadeIn(200);
}

function closeReportModal() {
  $('#report_outer_modal').fadeOut(200);
}
