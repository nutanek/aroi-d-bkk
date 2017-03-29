var markerAdd;

function initMap() {
    var latInit = 13.764931682823326;
    var lngInit = 100.5383068171966;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: {
            lat: latInit,
            lng: lngInit
        }
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    });

    markerAdd = new google.maps.Marker({
        position: {
            lat: latInit,
            lng: lngInit
        },
        map: map,
        animation: google.maps.Animation.BOUNCE,
        draggable: true
    });

    $("input[name=mapLat]").val(latInit);
    $("input[name=mapLon]").val(lngInit);
    $("input[name=mapLat]").trigger('input');
    $("input[name=mapLon]").trigger('input');

    google.maps.event.addListener(markerAdd, 'dragend', function(event) {
        $("input[name=mapLat]").val(this.getPosition().lat());
        $("input[name=mapLon]").val(this.getPosition().lng());
        $("input[name=mapLat]").trigger('input');
        $("input[name=mapLon]").trigger('input');
    });
}

function mapRestaurant() {
    var map = new google.maps.Map(document.getElementById('maps'), {
        zoom: 17,
        center: {
            lat: 13.76489,
            lng: 100.5381888
        }
    });
    var geocoder = new google.maps.Geocoder();

    var marker = new google.maps.Marker({
        position: {
            lat: 13.76489,
            lng: 100.5381888
        },
        map: map,
        animation: google.maps.Animation.BOUNCE,
        draggable: true
    });

}

function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status === 'OK') {
            var position = results[0].geometry.location;
            resultsMap.setCenter(position);
            markerAdd.setPosition(position);
            $("input[name=mapLat]").val(results[0].geometry.location.lat());
            $("input[name=mapLon]").val(results[0].geometry.location.lng());
            $("input[name=mapLat]").trigger('input');
            $("input[name=mapLon]").trigger('input');
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
