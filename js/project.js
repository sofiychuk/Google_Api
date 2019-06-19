window.onload = function () {
  var directionsService;
  var directionsDisplay;
  var map;

  function initMap() {
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: {
        lat: 49.233971,
        lng: 28.463193
      }
    });

    directionsDisplay.setMap(map);
  }

  function createRoute() {
    var address1 = document.getElementById('startvalue').value;
    var address2 = document.getElementById('endvalue').value;
    console.log(address1);
    console.log(address2);


    var geocoder = new google.maps.Geocoder();

    var temp, temp2;
    geocoder.geocode({
      'address': address1
    }, function (results, status) {
      temp = results[0].geometry.location;
      console.log('address', results);
      showRoute(temp, temp2);

    });
    geocoder.geocode({
      'address': address2
    }, function (results, status) {
      temp2 = results[0].geometry.location;
      console.log('address2', results, temp2.lat());
      showRoute(temp, temp2);
    });
  }

  function showRoute(startP, endP) {

    if (!startP || !endP) {
      return false
    }

    directionsService.route({
      origin: startP,
      destination: endP,
      travelMode: 'WALKING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  initMap();
  $('#btn-map').on('click', createRoute);
}