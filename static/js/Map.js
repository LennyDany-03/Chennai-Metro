// Initialize Green Map centered on Chennai
var Green_Map = L.map('Green_Map').setView([13.0827, 80.2707], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(Green_Map);

// Initialize Blue Map centered on Chennai
var Blue_Map = L.map('Blue_Map').setView([13.0827, 80.2707], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(Blue_Map);

// List of 17 stations for the Blue Line with coordinates
var blueStations = [
    { name: "Wimco Nagar Depot Metro", lat: 13.17934954019924, lon: 80.30731754786132 },
    { name: "Wimco Nagar Metro", lat: 13.179531143365129, lon: 80.30744509758446 },
    { name: "Thiruvottriyur Metro", lat: 13.172570437006806 , lon: 80.30547851292756 },
    { name: "Thiruvottriyur Theradi Metro", lat: 13.159961977817003, lon: 80.3023912425676 },
    { name: "Kaladipet Metro", lat: 13.151032936434857, lon: 80.29949799573328 },
    { name: "Tollgate", lat: 13.143420734094992, lon: 80.29651692827026 },
    { name: "New Washermenpet Metro", lat: 13.134898764970105, lon: 80.29300863991202 },
    { name: "Tondiarpet Metro", lat: 13.123978365017594, lon: 80.28825263991189 },
    { name: "Mannadi", lat: 13.095270585543462, lon: 80.28614956689646 },
    { name: "High Court", lat: 13.08750893900533, lon: 80.2851712840903 },
    { name: "Chennai Central", lat: 13.081312941900148, lon: 80.27297872456785 },
    { name: "Government Estate", lat: 13.069953710857414, lon: 80.27263370737369 },
    { name: "LIC", lat: 13.064533638391152, lon: 80.26604889573177 },
    { name: "Thousand Lights", lat: 13.058564715035674, lon: 80.25849593806002 },
    { name: "AG-DMS", lat: 13.044860170723139, lon: 80.24793633620914 },
    { name: "Teynampet", lat: 13.037447257793788, lon: 80.2467689129253 },
    { name: "Nandanam", lat: 13.030841036684707, lon: 80.23657420817336 },
    { name: "Saidapet", lat: 13.023795685865343, lon: 80.22810799573105 },
    { name: "Little Mount", lat: 13.014630426214941, lon: 80.2239642840891 },
    { name: "Guindy", lat: 13.009647191006835, lon: 80.21306830922336 },
    { name: "Alandur", lat: 13.00450023648073, lon: 80.20141808038747 },
    { name: "Nanganallur Road", lat: 13.000149883815077, lon: 80.19414428408878 },
    { name: "Meenambakkam", lat: 12.987902257238943, lon: 80.1764321822379 },
    { name: "Chennai International Airport", lat: 12.98105677453754, lon: 80.1639912253529 }
];

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

// Add Blue Line stations to the Blue Map and connect them with a custom polyline
var stationCoordinates = blueStations.map(function(station) {
    // Add a marker for each station
    L.marker([station.lat, station.lon])
        .bindPopup(station.name)
        .addTo(Blue_Map);
    
    // Return the coordinates for the polyline
    return [station.lat, station.lon];
});

// Create a polyline to represent the metro line for Blue Line
var blueLinePolyline = L.polyline(stationCoordinates, {
    color: 'blue',    // Line color
    weight: 6,        // Line thickness
    opacity: 0.7,     // Transparency of the line
    smoothFactor: 1,  // Smoothing factor for curved lines

}).addTo(Blue_Map);

// Zoom the Blue Map to fit the polyline
Blue_Map.fitBounds(blueLinePolyline.getBounds());

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
