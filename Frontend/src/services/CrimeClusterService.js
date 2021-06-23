
export function loadClusters(map, mapboxgl) {
    
    map.on('load', function () {
        // Add a new source from our GeoJSON data and
        // set the 'cluster' option to true. GL-JS will
        // add the point_count property to your source data.
        map.addSource('crime', {
            type: 'geojson',
            // Point to GeoJSON data. This example visualizes all M1.0+ crime
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            data:
                "https://api.jsonbin.io/b/60a645c6d943f607a50b6253",
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });

        map.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'crime',
            filter: ['has', 'point_count'],
            paint: {
                // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                // with three steps to implement three types of circles:
                //   * Blue, 20px circles when point count is less than 100
                //   * Yellow, 30px circles when point count is between 100 and 750
                //   * Pink, 40px circles when point count is greater than or equal to 750
                'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    '#51bbd6',
                    4,
                    '#fff07d',
                    10,
                    '#f28cb1'
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    20,
                    4,
                    30,
                    8,
                    40
                ]
            }
        });

        map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'crime',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 16
            }
        });

        map.addLayer({
            id: 'unclustered-point',
            type: 'circle',
            source: 'crime',
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#d64215',
                'circle-radius': 8,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff'
            }
        });

        // inspect a cluster on click
        map.on('click', 'clusters', function (e) {
            var features = map.queryRenderedFeatures(e.point, {
                layers: ['clusters']
            });
            var clusterId = features[0].properties.cluster_id;
            map.getSource('crime').getClusterExpansionZoom(
                clusterId,
                function (err, zoom) {
                    if (err) return;

                    map.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom: zoom
                    });
                }
            );
        });

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        var pop = new mapboxgl.Popup();
        map.on('mouseenter', 'unclustered-point', function (e) {
            map.getCanvas().style.cursor = 'pointer';
            
            var coordinates = e.features[0].geometry.coordinates.slice();
            var mag = e.features[0].properties;
            var html = "";
            var year = mag.year;
            var month = mag.month;
            var day = mag.month;
            var summary = mag.summary;
            var state = mag.state;
            var location = mag.location;
            var city = mag.city;
            var attack = mag['attack_type']

            if(year) {
                html += '<strong>Year/Month: </strong> ' + year + '/' + month;
            }
            if(state && city) {
                html += '<br><strong>City: </strong> ' + city + '-' + state;
            }
            if(location) {
                html += '<br><strong>Location: </strong> ' + location;
            }
            if(summary) {
                html += '<br><strong>Summary: <br></strong> ' + summary;
            }
            if(attack) {
                html += '<br><strong>Attack Type: </strong> ' + attack;
            }
            // Ensure that if the map is zoomed out such that
            // multiple copies of the feature are visible, the
            // popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            
                pop.setLngLat(coordinates)
                .setHTML(
                     html
                )
                .addTo(map);
        });

        // map.on('mouseenter', 'clusters', function () {
        //     map.getCanvas().style.cursor = 'pointer';
        // });
        map.on('mouseleave', 'clusters', function () {
            map.getCanvas().style.cursor = '';
            pop.remove();
        });
    });
}