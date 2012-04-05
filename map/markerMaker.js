// functions to make Google Maps markers

APP.createMarkers = function(stations, toggle, imagecreator, map) {
    markers = new Object();
    for (id in stations) {
        markers[id] = APP.createMarker(stations[id], toggle, imagecreator, map);
    }
    return markers;
}

APP.createMarker = function(station, toggle, imagecreator, map) {
    iconSize=new google.maps.Size(20,32); 
    iconAnchor=new google.maps.Point(10,32); 
    infoWindowAnchor=new google.maps.Point(10,3); 

    image = imagecreator(station, toggle, map);

    var marker = new google.maps.Marker({
        size: iconSize, 
        anchor: iconAnchor,
        icon: image,
        map: map,
        position: new google.maps.LatLng(station['latitude'], station['longitude']),
    });

    google.maps.event.addListener(marker, "click", function() {
        // We always use the same infowindow, just update it as necessary
        var contentString = "<b>" + station['name'] + "</b> <br>" + new
        String(station['nbBikes']) + " bikes" + ", " +new
        String(station['nbEmptyDocks']) + " parking spots";
        APP.state.infowindow.setContent(contentString);
        APP.state.infowindow.open(map, marker);
        });
    return marker;
}
