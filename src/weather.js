let now = new Date();
let days = [
  "Sunday", 
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday", 
  "Friday", 
  "Saturday"
];
let day = days[now.getDay()];
let months = [
  "January", 
  "February", 
  "March", 
  "April", 
  "May", 
  "June", 
  "July", 
  "August", 
  "September", 
  "October", 
  "November", 
  "December"
];
let month = months[now.getMonth()];
let date = now.getDate();
let year= now.getFullYear();
let hour = now.getHours();
let minute = now.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (minute < 10) {
  minute = `0${minute}`;
}
let currentTime = document.querySelector("h2");
currentTime.innerHTML = `${day}, ${month} ${date}, ${year} ${hour}:${minute}`;



function search(city) {
  let apiKey = `b72128b99d2ac3a4ff4a2be1ec63d412`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
  
}

function showWeather(response) {
  let iconElement = document.querySelector("#icon");
  fahrenheitTemperature = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".degrees").innerHTML = Math.round(fahrenheitTemperature);
  document.querySelector(".weather-type").innerHTML = response.data.weather[0].main;
  document.querySelector(".wind").innerHTML = 
  `Wind: ${Math.round(response.data.wind.speed)} mph`;
  document.querySelector(".humidity").innerHTML = 
  `Humidity: ${Math.round(response.data.main.humidity)}%`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].main);
  getForecast(response.data.coord);
}

function showCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = (fahrenheitTemperature - 32) * 5 / 9;
  fahrenheitLink.classList.remove("active");
  fahrenheitLink.classList.add("inactive");
  celsiusLink.classList.remove("inactive");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector(".degrees");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  celsiusLink.classList.add("inactive");
  fahrenheitLink.classList.remove("inactive");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector(".degrees");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function getForecast(coordinates) {
  let apiKey = `b72128b99d2ac3a4ff4a2be1ec63d412`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index >= 1 && index <= 6) {
    forecastHTML = forecastHTML + 
    `
    <div class="col-2">
    <div class="weather-forecast-day">
    ${formatDay(forecastDay.dt)}
    </div>
    ${index}
    <img 
    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
    alt="clouds" 
    class="forecast-image" 
    />
    <div class="weather-forecast-temperatures">
    <span class="max-temp">
    ${Math.round(forecastDay.temp.max)}
    </span>
    <span class="min-temp">
    ${Math.round(forecastDay.temp.min)}
    </span>
    </div>
    </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let dayNumber = new Date(timestamp * 1000);
  let weekday = dayNumber.getDay();
  let weekdays = [
  "Sun", 
  "Mon", 
  "Tue", 
  "Wed", 
  "Thu", 
  "Fri", 
  "Sat"
];
  return weekdays[weekday];
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

search("Austin");
