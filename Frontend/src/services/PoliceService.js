import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import backend from "../config";

async function forwardGeocoding(place) {
    let response = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + place + ".json?access_token=Your MapBox Token")
    let data = await response.json();

    return data['features'][0].center;

}

export async function helper(map) {
    let response = await fetch(backend + "/police/get-zones/");
    
    let data = await response.json()
    data.forEach(async u => {
        //fetch name from coordinates of alloted beats
        let allocate = [u.lon, u.lat];
        // create the popup
        var popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML('<strong>Station Head: </strong> :' + u.head + '<br><strong>Mobile: </strong>' + u.mobile + '<br><strong>Zone Name: </strong>' + u.zone_name)
            ;

        // create DOM element for the marker
        var el = document.createElement('div');
        el.id = 'marker';
        
        // create the marker
        new mapboxgl.Marker({ color: 'green', rotation: 45 })
            .setLngLat(allocate)
            .setPopup(popup) // sets a popup on this marker
            .addTo(map);
    });
    
    return data;
}

export function getZones(map) {
    var zones = helper(map);
    return zones;
}

