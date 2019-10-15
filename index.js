// DOM Selector
const body = document.querySelector("body"),
    cityName = document.querySelector(".city-input"),
    weatherWrapper = document.querySelector(".show-weather-wrapper"),
    weatherTitle = document.querySelector(".weather-title"),
    weatherPic = document.querySelector(".weather-pic"),
    weatherTemp = document.querySelector(".temp"),
    locationName = document.querySelector(".location-info"),
    trackLocation = document.querySelector(".location-icon"),
    errorMessage = document.querySelector(".show-error-message");

// DOM Style
body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?weather')";
weatherWrapper.style.display = "none";
errorMessage.style.display = "none";


// API Info
var BASE = "http://api.weatherstack.com/current",
    KEY = "b0128c5c74dd9ffc404e862591b79580";

// API GET Data
function weatherForecast(q) {
    fetch(`${BASE}?access_key=${KEY}&query=${q}`)
        .then(respons => respons.json())
        .then(data => {
            console.log(data);
            locationName.innerHTML = `${data.location.name}, ${data.location.country}. <span>Local Time: ${data.location.localtime}</span>`;
            weatherTemp.innerHTML = `${data.current.temperature} <sup>&deg;</sup>C`;
            weatherTitle.innerHTML = data.current.weather_descriptions[0];
            weatherPic.src = data.current.weather_icons[0];
            weatherWrapper.style.display = "block";
        })
        .catch(error => {
            errorMessage.innerHTML = "Can't find your location, maybe you made a spelling mistake!";
            errorMessage.style.display = "block";
        })
}

// Find Current Location
function cureentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            var lati = position.coords.latitude;
            var longi = position.coords.longitude;
            var latiLongi = `${lati}, ${longi}`;
            weatherForecast(latiLongi);
            trackLocation.style.backgroundPosition = '-29px 0px';
        })
    }
}

// Find City Name
function findCity() {
    return cityName.value;
}

// When Hit enter on input box
cityName.addEventListener('keypress', e => {
    if (e.which === 13) {
        weatherWrapper.style.display = "none";
        errorMessage.style.display = "none";
        weatherForecast(findCity());
    }
})

// When Click on Location Track Icon
trackLocation.addEventListener('click', cureentLocation);


// Git Fork Button
function gitFork(url) {
    var anchorBtn = document.createElement('a');
    anchorBtn.href = url;
    var btnImg = document.createElement('img');
    btnImg.src = 'https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png';
    anchorBtn.setAttribute('style', 'position: fixed;top: 0;right: 0;z-index: 999;');
    anchorBtn.appendChild(btnImg);
    document.querySelector("body").appendChild(anchorBtn);
}

gitFork('https://github.com/rajuahammadfanz/weather-forecast');

/*
  position: fixed;top: 0;right: 0;z-index: 999;
*/