//set global variables
var lat;
var long;
var playDateMapBoxToken = 'pk.eyJ1IjoibWFya2dhdHgiLCJhIjoiY2w5MndoNDVqMDEwZDN5bXBiOTZseTYyMSJ9.-ZUmZXLJEzZyTkCwSBMGuw';
// variable for weather icons
var iconCode;

//Check for geolocation in browser
if ('geolocation' in navigator) {
    console.log( 'geolocation is available' ); 
    // continue with using geolocation 
  } else {
    console.log(' geolocation IS NOT available ');
    // send to function to simply search for location, maybe noGeoSearchMap();
  };

function success(lat, long) {
    logLatLong(lat, long);
  }
  
function error() {
    alert(`Sorry, no position available. ERROR(${error.code}): ${error.message}. \nLet's try a search option instead.`);
    noGeoSearchMap();
  }
  
const options = {
    enableHighAccuracy: false,
    maximumAge: 30000,
    timeout: 27000
  };
  
  //grabs position once 
navigator.geolocation.getCurrentPosition((position) => {
    success(position.coords.latitude, position.coords.longitude);
    console.log(lat);
    console.log(long);
    var coordinateUrl = queryUrl + lat + '&lon=' + long + '&key=' + weatherAPIKey + '&units=I';
    console.log(coordinateUrl);
  }, error,options);

  // regularly updates position -- if we want to constantly update location
//   const watchID = navigator.geolocation.watchPosition(success, error, options);

//   navigator.geolocation.clearWatch(watchID); --- stop watching position
function logLatLong (latitude, longitude) {
    lat = latitude;
    long = longitude;
}

  function noGeoSearchMap(){

};

//weatherbit.io API retrieval
  var weatherAPIKey = "54d824ecca864b9dbe80b3b774711d3a";
  var queryUrl = "https://api.weatherbit.io/v2.0/current?lat=";
//retrieving weather at current location
const weatherIconList = "https://www.weatherbit.io/api/codes";
function geolocationWeather(){
  var coordinateUrl = queryUrl + lat + '&lon=' + long + '&key=' + weatherAPIKey + '&units=I';
  fetch(coordinateUrl).then(function weatherDataHere() {
    //create section for weather display
    var weatherHereEl = $(`<div>`).attr({id: weather-here});
    //obtain weather icons from API, TBD
    //var weatherIcon = weatherData.current.weather[0].icon;
    //var cityWeatherIcon = weatherIcons + weatherIcon + '.jpg';
    //create display for current location
    var weatherDisplayEl = $(`<h2>`).text("Your current location")
    //add in image element for weather icon
    var weatherIconImg = $(`<img>`).attr({
      id: 'current-weather-icon',
      src: weatherIconList,
      alt: 'Image of simple weather icon',
    })
    //create unordered list of desired weather details
    var weatherListEl = $(`<ul>`)
    var weatherDetails = [
      "Temperature: " + data.temp + " °F",
      "Wind: " + data.wind_spd + " Miles per Hour",
      "Humidity: " + data.rh + "%",
      "UV Index: " + data.uv
    ]
    for (var x = 0; x < weatherDetails.length; x++){
      var weatherItems = $(`<li>`).text(weatherDetails[x])
      weatherListEl.append(weatherItems);
    }
    weatherHereEl.append(weatherIconImg);
    weatherHereEl.append(weatherListEl);
  })
}
geolocationWeather();