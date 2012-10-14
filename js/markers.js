$(document).ready(function() {
  $("#map").css({
		height: 600,
		width: 800
	});
	var myLatLng = new google.maps.LatLng(-34.5, -58.5);
    MYMAP.init('#map', myLatLng, 7);

  $("#showmarkers").click(function(e){
    MYMAP.placeMarkers();
  });

  $("#showlatlong").click(function(e){
    MYMAP.getLatLong();
  });
});

var markersArray = [];

var MYMAP = {
  map: null,
  bounds: null,
  markersOn: false
}

MYMAP.init = function(selector, latLng, zoom) {
  var myOptions = {
    zoom:zoom,
    center: latLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  this.map = new google.maps.Map($(selector)[0], myOptions);
  this.bounds = new google.maps.LatLngBounds();
}

MYMAP.placeMarkers = function()
{
  if (MYMAP.markersOn != true) {
    for (var i = 0; i < markersArray.length; i++ ) {
      markersArray[i].setMap(MYMAP.map);
    }
    MYMAP.markersOn = true;
  } else {
    for (var i = 0; i < markersArray.length; i++ ) {
      markersArray[i].setMap(null);
    }
    MYMAP.markersOn = false;
  }
}

MYMAP.addMarker = function(lat, lon)
{
  var point = new google.maps.LatLng(lat, lon);

  markersArray.push(new google.maps.Marker({position: point, map: MYMAP.map}));
}

MYMAP.getLatLong = function()
{
  var place = prompt('Lugar?');

  var mygc = new google.maps.Geocoder();
  mygc.geocode({'address' : place}, function(results, status){
      MYMAP.addMarker(results[0].geometry.location.lat(),
                      results[0].geometry.location.lng());
  });
}