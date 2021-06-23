import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


// Function that returns name of the place from latitude and longitude works only if the lat,long are exact and have more decimal places

async function reverseGeocoding(latitude, longitude) {
    let response = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + longitude + ',' + latitude + ".json?access_token=Your MapBox TOken");
    let data = await response.json()
    return data;
}

// Pulsing dot animation for live alerts
async function createDot(map) {
    var size = 200;

    let newDot = 'pulsingDot' + Math.random();
    newDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // get rendering context for the map canvas when layer is added to the map
        onAdd: function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d');
        },

        // called once before every frame where the icon will be used
        render: function () {
            var duration = 1000;
            var t = (performance.now() % duration) / duration;

            var radius = (size / 2) * 0.3;
            var outerRadius = (size / 2) * 0.7 * t + radius;
            var context = this.context;

            // draw outer circle
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                outerRadius,
                0,
                Math.PI * 2
            );
            context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
            context.fill();

            // draw inner circle
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                radius,
                0,
                Math.PI * 2
            );
            context.fillStyle = 'rgba(255, 100, 100, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();

            // update this image's data with data from the canvas
            this.data = context.getImageData(
                0,
                0,
                this.width,
                this.height
            ).data;

            // continuously repaint the map, resulting in the smooth animation of the dot
            map.triggerRepaint();

            // return `true` to let the map know that the image was updated
            return true;
        }
    };
    return newDot;
}


// Function that renders alert on sidebar from firebase
export async function renderAlert(alert, map) {
    
    var pulsingDot = await createDot(map);
    // Display ale  rts on map after click
    
    // document.getElementById(alert.name + alert.mobile).addEventListener('click', async function () {

    map.on('load', async function() {

        var location = []
        var latitude = alert.lat;
        var longitude = alert.lon;
        location.push(longitude);
        location.push(latitude);
        var reverseLatLong = await reverseGeocoding(latitude, longitude);

        // Message alerts on map
        var mapAlert = '<strong>Full Name: </strong>' + alert.name + '<br><strong>Mobile: </strong>' + alert.mobile + '<br><strong>Time: </strong>' + new Date(alert.date_created) + '<br><strong>Place Name: </strong>' + reverseLatLong.features[0].place_name.split(',') + '<br><strong>Description: </strong>' + alert.description;

                // API to set alert marker
                var popup = new mapboxgl.Popup({ 
                    closeButton: true,
                    closeOnClick: true 
                });
                // .setLngLat(location)
                // .setHTML(mapAlert);
                // .addTo(map);
                // API to go to that location

                let dynamicImage = 'img' + Date.now();

                map.addImage(dynamicImage, pulsingDot, { pixelRatio: 2 });

                map.addSource(dynamicImage, {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'type': 'Feature',
                                'geometry': {
                                     'type': 'Point',
                                    'coordinates': location
                                }
                            }
                        ]
                    }
                });
                map.addLayer({
                    'id': dynamicImage,
                    'type': 'symbol',
                    'source': dynamicImage,
                    'layout': {
                        'icon-image': dynamicImage
                    }
                });


                // hover popup
                map.on('mouseenter', dynamicImage, function (e) {
                    // Change the cursor style as a UI indicator.
                    map.getCanvas().style.cursor = 'pointer';
                     
                    var coordinates = e.features[0].geometry.coordinates.slice();
                    
                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
                     
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup.setLngLat(location).setHTML(mapAlert).addTo(map);
                    });
                     
                    map.on('mouseleave', dynamicImage, function () {
                        map.getCanvas().style.cursor = '';
                        
                    });
              
                
        });
}
