//baseMap
var map = L.map("map").setView([32, 72], 5);

var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);


var imageUrl = 'Datasets/raster.png ';
var url2= 'https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg'
var latLngBounds = L.latLngBounds([[23.694683075, 79.307351740], [ 37.089423898, 60.878597404]]);

var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
    opacity: 0.5,
    interactive: true
}).addTo(map);


//_____________________________________________________________________________________________________________________________________________________________________________
//provincial boundary pakistan
var pro = L.geoJSON(provincial, {
        color: "black",
        weight: 2,  
}).addTo(map);

//Multan boundary blinking
var multanLayer = L.geoJSON(mlt_poly, {
  style: function (feature) {
    var ucValue = feature.properties.ADM2_EN;
    var isBlinking = ucValue === "Multan";

    return {
      fillColor: isBlinking ? "red" : "dark-grey",
      color: isBlinking ? "red" : "black",
      weight: isBlinking ? 2 : 0.3, // Set weight to 4 for non-selected districts
      className: isBlinking ? "blink" : ""
    };
  } 
}).addTo(map);

//Gujranwala boundary blinking
var gjrLayer = L.geoJSON(gjr_poly, {
  style: function (feature) {
    var ucValue = feature.properties.ADM2_EN;
    var isBlinking = ucValue === "Gujranwala";

    return {
      fillColor: isBlinking ? "red" : "dark-grey",
      color: isBlinking ? "red" : "black",
      weight: isBlinking ? 2 : 0.3, // Set weight to 4 for non-selected districts
      className: isBlinking ? "blink" : ""
    };
  } 
}).addTo(map);

//Peshawar boundary blinking
var peshLayer = L.geoJSON(pesh_poly, {
  style: function (feature) {
    var ucValue = feature.properties.ADM2_EN;
    var isBlinking = ucValue === "Peshawar";

    return {
      fillColor: isBlinking ? "red" : "dark-grey",
      color: isBlinking ? "red" : "black",
      weight: isBlinking ? 2 : 0.3, // Set weight to 4 for non-selected districts
      className: isBlinking ? "blink" : ""
    };
  } 
}).addTo(map);

//Faisalabad boundary blinking
var fsdLayer = L.geoJSON(fsd_poly, {
  style: function (feature) {
    var ucValue =  feature.properties.ADM2_EN;
    var isBlinking = ucValue === "Faisalabad";

    return {
      fillColor: isBlinking ? "red" : "dark-grey",
      color: isBlinking ? "red" : "black",
      weight: isBlinking ? 2 : 0.3, // Set weight to 4 for non-selected districts
      className: isBlinking ? "blink" : ""
    };
  } 
}).addTo(map);

//Lahore boundary blinking
var lhrLayer = L.geoJSON(lhr_poly, {
  style: function (feature) {
    var ucValue = feature.properties.ADM2_EN;
    var isBlinking = ucValue === "Lahore";

    return {
      fillColor: isBlinking ? "red" : "dark-grey",
      color: isBlinking ? "red" : "black",
      weight: isBlinking ? 2 : 0.3, // Set weight to 4 for non-selected districts
      className: isBlinking ? "blink" : ""
    };
  } 
}).addTo(map);

var krchLayer = L.geoJSON(kch_layer, {
  style: function (feature) {
    var ucValue = feature.properties.ADM2_EN;
    var isBlinking = ucValue === "Karachi";

    return {
      fillColor: isBlinking ? "red" : "dark-grey",
      color: isBlinking ? "red" : "black",
      weight: isBlinking ? 2 : 0.3, // Set weight to 4 for non-selected districts
      className: isBlinking ? "blink" : ""
    };
  } 
}).addTo(map);

//Zoom to next coordinates
var coordinates = [
  [31.49156850545804, 74.34277929668578],
  [31.4504, 73.13508854573],
  [34.00540678684681, 71.56599997498853],
  [32.1877, 74.1945],
  [30.1575, 71.5249],[24.8607, 67.0011]
];
var index = 0;

var cities= ["Lahore", "Faisalabad", "Peshawar", "Gujranwala", "Multan", "Karachi"];

function change_city(x){
  document.getElementById("p1").innerHTML = x;
}

y= "";
function zoomToNextCoordinate() {
  // Start by zooming out to view all of Pakistan for 5 seconds
  map.setView([30.5, 69.7], 5.5);
  setTimeout(function() {
    // After that, zoom in to the current coordinate for 5 seconds
    map.setView(coordinates[index], 10);
    change_city(cities[index]);
    setTimeout(function() {
      // Then, zoom out to view all of Pakistan again for 5 seconds
      map.setView([30.5, 69.7], 5.5);
      change_city(y);
      // Update the index for the next coordinate
      index++;
      if (index >= coordinates.length) {
        index = 0;
      }
    }, 5000);
  }, 5000);
}

setInterval(zoomToNextCoordinate, 15000);
zoomToNextCoordinate();


document.addEventListener("DOMContentLoaded", function () {
  // Get the width of the content container
  const scrollContainer = document.getElementById("scroll-container");
  const alphabetContainer = document.getElementById("alphabet-container");
  const containerWidth = scrollContainer.offsetWidth;
  const contentWidth = alphabetContainer.offsetWidth;

  // Calculate the duration based on content and container width
  const animationDuration = "250s";

  // Apply the calculated duration to the animation
  alphabetContainer.style.animationDuration = animationDuration;
});

const districtPopulations = document.querySelectorAll('.district-population');

function startBlinking(index) {
    districtPopulations.forEach((element, i) => {
        element.setAttribute('data-blink', i === index ? 'true' : 'false');
    });
}



var myNews=["Lahore: 10.442 million","Faisalabad: 9.023 milion","Gujranwala: 5.05 million","Multan: 1.85 million","Peshawar: 3.449 million"];


var DistrictInfo=document.getElementById("bold_");
var i=0;
function updateInfo()
{
  DistrictInfo.textContent=myNews[i];
  i++;
  console.log(i);
  if(i>=myNews.length)
  {
    i=0;
  }
}

setInterval(updateInfo,5000);
updateInfo();
//________________________________________________________________________________________________________________________________________________________________________________________________________

