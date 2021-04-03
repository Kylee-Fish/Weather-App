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
  let apiKey = "b72128b99d2ac3a4ff4a2be1ec63d412";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);

}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".degrees").innerHTML = Math.round(response.data.main.temp);
  document.querySelector(".weather-type").innerHTML = response.data.weather[0].main;
  document.querySelector(".wind").innerHTML = 
  `Wind: ${Math.round(response.data.wind.speed)} mph`;
  document.querySelector(".humidity").innerHTML = 
  `Humidity: ${Math.round(response.data.main.humidity)}%`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].main);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

search("Austin");
