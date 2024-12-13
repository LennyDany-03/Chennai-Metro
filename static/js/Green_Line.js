// Initialize Green Map centered on Chennai
var Green_Map = L.map('Green_Map').setView([13.0827, 80.2707], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(Green_Map);

// List of 17 stations for the Green Line with coordinates
var greenStations = [
    { name: "Chennai Central", lat: 13.081312941900148, lon: 80.27297872456785 },   //1
    { name: "Egmore Metro", lat: 13.079474358255103, lon: 80.26088870168526 },  //2
    { name: "Nehru Park Metro", lat: 13.078993634835676, lon: 80.2508465114512 },   //3
    { name: "Kilpauk Metro", lat: 13.077883515234085, lon: 80.24275532631148 }, //4
    { name: "Pachaiyappa's College Metro", lat: 13.075761999138628, lon: 80.23236813962326 },   //5
    { name: "Shenoy Nagar", lat: 13.07878851675779, lon: 80.2251505887002 },    //6
    { name: "Anna Nagar East", lat: 13.084815538617336, lon: 80.21972326845857 },   //7
    { name: "Anna Nagar Tower Metro", lat: 13.085184192472859, lon: 80.20875688195304 },    //8
    { name: "Thirumangalam Metro Station", lat: 13.085565644411925, lon: 80.20162763962334 },   //9
    { name: "Koyambedu Metro", lat: 13.073600494758244, lon: 80.19486699544737 },   //10
    { name: "Puratchi Thalaivi Dr.J.Jayalalithaa CMBT Metro", lat: 13.068729849702244, lon: 80.20394518195273 },    //11
    { name: "MMDA Arumbakkam Metro Station", lat: 13.062398475361345, lon: 80.21172653962302 }, //12
    { name: "Vadpalani Metro", lat: 13.05092251808476, lon: 80.21217958379869 },
    { name: "Ashok Nagar Metro", lat: 13.035642910847452, lon: 80.21127447030405 },
    { name: "Ekkatutthangal Metro Station", lat: 13.016927841270164, lon: 80.20539391263351 },
    { name: "Alandur Metro", lat: 13.004500236489584, lon: 80.20151463962226 },
    { name: "St. Thomas Mount Metro", lat: 12.995332211657448, lon: 80.19876702243529 },
];

// Add Green Line stations to the Green Map and connect them with a custom polyline
var greenStationCoordinates = greenStations.map(function(station) {
    // Add a marker for each station
    L.marker([station.lat, station.lon])
        .bindPopup(station.name)
        .addTo(Green_Map);
    
    // Return the coordinates for the polyline
    return [station.lat, station.lon];
});

// Create a polyline to represent the metro line for Green Line
var greenLinePolyline = L.polyline(greenStationCoordinates, {
    color: 'green',    // Line color
    weight: 6,         // Line thickness
    opacity: 0.7,      // Transparency of the line
    smoothFactor: 1,   // Smoothing factor for curved lines
}).addTo(Green_Map);

// Zoom the Green Map to fit the polyline
Green_Map.fitBounds(greenLinePolyline.getBounds());
