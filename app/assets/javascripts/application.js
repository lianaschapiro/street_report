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

//= require_tree .
$(function(){
  // closes main description
  $("#description_hide").on('click', function(){
    $("#main-description").animate({
      width: '0',
    });
    $("#main-description > h2").fadeOut(100);
    $("#main-description > p").fadeOut(100);
    $('#main-map').animate({
      width: '72.5%',
      marginLeft: '1.92%'
    //expands map when main description is hidden
    },400,function(){
          google.maps.event.trigger(map, 'resize');
     });
    //adds "show" button when main desription is hidden
    $("#show_description").show();
  });

  // re-opens / expands main description  
  $("#show_description").on('click',
    function(){
      $("#main-description").animate({
      width: '23%',
    });
    $("#main-description > h2").delay(400).fadeIn();
    $("#main-description > p").delay(400).fadeIn();
    $('#main-map').animate({
      width: '50%',
      marginLeft: '1.8%'
    //shrinks map when main description is re-opened / expanded
    },400,function(){
          google.maps.event.trigger(map, 'resize');
     });
    // hides "show" button when main description is re-opened / expanded
    $("#show_description").hide();
    });

    // ########### MOBILE-READY MENU #############

    $('#hide_mobile').on('click',
        function(){
          $("#main-description").slideUp(500);
          $("#show_mobile").delay(500).slideDown(200);
        });
    $("#show_mobile").on('click',
      function(){
        $("#show_mobile").slideUp(200);
        $("#main-description").delay(200).slideDown(500);

      });
    $("#mobile_menu").on('click',
      function(){
        $(".right").fadeToggle('fast');
      });

    // ############################################

    // Fades out flash messages
    $("#flashy").delay(1000).fadeOut(1000);

});

// Describes map we see when loaded
function initialize() {
  var myCenter = new google.maps.LatLng(40.7127, -74.0059)
  var mapProp = {
    scrollwheel: false,
    mapTypeControl: false,
    streetViewControl: false,
    center:myCenter,
    zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("map"),mapProp);

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


  // Zooms in on marker click
  google.maps.event.addListener(marker,'click',function() {
    map.setZoom(15);
    map.setCenter(marker.getPosition());
  });

  // Opens infowindow on marker click
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
    });

  // This is a new map with a geocoded address
  var geocoder = new google.maps.Geocoder();

  // This function geocodes the address entered on submit in report modal
  document.getElementById('search').addEventListener('submit', function(e) {
    e.preventDefault();
    var address = document.getElementById("address").value;
    geocodeAddress(geocoder, map, address);
  });

  //grabs all of the things with the class load_all_markers
  var things = document.getElementsByClassName('load_all_markers');

  // gets the length of load_all_markers
  var length = document.getElementsByClassName('load_all_markers').length

    
  var arr = [];
  var arrTitle = []
  var arrBody = []
  var arrDetails = []
  // iterates through var things (array) and adds stuff to empty arrays (dataset.thang refers to html attributte data-thang)
  for (var i = 0; i < length; i++){
    arr.push(things[i].dataset.thang);
    arrTitle.push(things[i].dataset.title);
    arrBody.push(things[i].dataset.body);
    arrDetails.push(things[i].dataset.details);
  }

  // var arr is now an array of objects in string form

  // iteration of arr and returning it's object form using JSON.parse saved as variable "thung"
  for (var j = 0; j < length; j++){

    var thung = JSON.parse(arr[j]);
    var rTitle = arrTitle[j];
    var rBody = arrBody[j];
    var rDetails = arrDetails[j];


    // make new marker with the object thung which contains latitude and longitude
    var marks = new google.maps.Marker({
      position: thung,
      map: map
    });
     var infoWindow = new google.maps.InfoWindow({
          content: "<b>" + rTitle + "</b><br><br>" + rBody + "<br>" + rDetails
     });
    addInfoWindow(marks,rTitle,rBody,rDetails)

    // function anchors infowindow to each specific marker
    function addInfoWindow(marker, title, body, details) {
      var infoWindow = new google.maps.InfoWindow({
          content: "<b>" + title + "</b><br><br>" + body + details
      });
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, this);
          map.setZoom(15);
          map.setCenter(marker.getPosition());
      });
    }
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
      setTimeout(function(){ 
        document.getElementById("submit").setAttribute("value", "Search"); }, 3000);

      // console.log(marker.position.lat())
      // console.log(marker.position.lng())
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// ######### NEW REPORT MODAL ############

function openReportModal() {
  $('#report_outer_modal').fadeIn(200);
}

function closeReportModal() {
  $('#report_outer_modal').fadeOut(200);
}


