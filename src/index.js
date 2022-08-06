function formatDate(date) {
  let nowHour = now.getHours();
  if (nowHour < 10) {
    nowHour = `0${nowHour}`;
  }
  let nowMinute = now.getMinutes();
  if (nowMinute < 10) {
    nowMinute = `0${nowMinute}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = days[now.getDay()];
  return ` ${dayName} ${nowHour}:${nowMinute}`;
}

let now = new Date();

let dateElement = document.querySelector("#wholedate");

dateElement.innerHTML = formatDate(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weatherForecastWindow");
  let forecastHTML = `<div class=row>`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col-3">
  <span class"day">${formatDay(forecastDay.dt)}</span>
  <div>    <img
  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
  alt=""
  width="42"
/></div>
  <div class="weather-forecast-temperatures">
  <span class="weather-forecast-temperature-max"> ${Math.round(
    forecastDay.temp.max
  )}°| </span>
  <span class="weather-forecast-temperature-min"> ${Math.round(
    forecastDay.temp.min
  )}° </span>
</div>
  </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "58b3466d5113849cc0dbfb1ee306eb84";
  let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(forecastUrl).then(displayForecast);
}

function weatherChange(response) {
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#gdansk").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humi").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#win").innerHTML = Math.round(
    response.data.wind.speed
  );
  celsiusTemperature = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
function searchCity(cityInfo) {
  let apiKey = "58b3466d5113849cc0dbfb1ee306eb84";
  let apiWholeUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInfo}&appid=${apiKey}&units=metric`;
  axios.get(apiWholeUrl).then(weatherChange);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInfo = document.querySelector("#givenCity").value;
  searchCity(cityInfo);
}

function findlocation(position) {
  let apiKey = "58b3466d5113849cc0dbfb1ee306eb84";
  let apiWholeUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiWholeUrl).then(weatherChange);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findlocation);
}

let formSub = document.querySelector("#submited");
formSub.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  cel.classList.remove("active");
  fah.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  cel.classList.add("active");
  fah.classList.remove("active");

  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fah");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#cel");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("New York");
