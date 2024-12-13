// Initialize the map centered around Chennai
var map = L.map('map').setView([13.115, 80.270], 13);

// Add OpenStreetMap tiles as a base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add HERE traffic tiles layer (flow data)
var hereApiKey = '7muZuMRWL_nmVVJOFKYm36RpH4YEYhrMNJ5PLcIUhEI'; // Replace with your actual HERE API key
L.tileLayer(`https://{s}.traffic.maps.ls.hereapi.com/traffic/6.0/tiles/flow/{z}/{x}/{y}/256/png8?apiKey=${hereApiKey}`, {
    attribution: 'Traffic Flow © HERE',
    subdomains: '1234', // HERE subdomains
    maxZoom: 19
}).addTo(map);

function button() {
    // Retrieve input values
    let fromLat = parseFloat(document.getElementById("From_Lat").value);
    let fromLon = parseFloat(document.getElementById("From_Lon").value);
    let toLat = parseFloat(document.getElementById("To_Lat").value);
    let toLon = parseFloat(document.getElementById("To_Lon").value);

    // Define start and end coordinates
    var start = [fromLat, fromLon];
    var end = [toLat, toLon];

    // Add markers for start and end points
    L.marker(start).addTo(map).bindPopup("Start Location").openPopup();
    L.marker(end).addTo(map).bindPopup("End Location");

    // Fetch the route using OSRM API
    var osrmUrl = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;

    fetch(osrmUrl)
        .then(response => response.json())
        .then(data => {
            // Extract route coordinates
            var routeCoords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);

            // Draw a blue polyline on the route
            var routeLine = L.polyline(routeCoords, { color: 'blue' }).addTo(map);

            // Fit map to route bounds
            map.fitBounds(routeLine.getBounds());

            // Get travel time and distance
            var travelTime = data.routes[0].duration; // in seconds
            var distance = data.routes[0].distance; // in meters

            // Convert to human-readable format
            var travelTimeMinutes = (travelTime / 60).toFixed(0); // in minutes
            var distanceKm = (distance / 1000).toFixed(2); // in kilometers

            // Display travel info
            document.getElementById('info').innerHTML = `
                Travel Time: ${travelTimeMinutes} minutes <br>
                Distance: ${distanceKm} km
            `;

            // Add traffic level
            fetch(`https://traffic.api.here.com/traffic/6.0/flow.json?prox=${fromLat},${fromLon},1000&apiKey=${hereApiKey}`)
                .then(response => response.json())
                .then(trafficData => {
                    var trafficLevel = trafficData.RWS[0].RW[0].FIS[0].FI[0].CF[0].JF;
                    var trafficStatus = getTrafficStatus(trafficLevel);
                    document.getElementById('info').innerHTML += `<br> Traffic Level: ${trafficStatus}`;
                })
                .catch(error => console.error("Error fetching traffic data:", error));
        })
        .catch(error => console.error("Error fetching route data:", error));
}

function getTrafficStatus(trafficLevel) {
    if (trafficLevel < 3) {
        return "Light";
    } else if (trafficLevel < 6) {
        return "Moderate";
    } else {
        return "Heavy";
    }
}

