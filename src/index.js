let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let DayOfTheWeek = document.querySelector("#days");
let dayName = days[now.getDay()];
DayOfTheWeek.innerHTML = `${dayName}`;

let hour = document.querySelector("#hours");
let nowHour = now.getHours();
hour.innerHTML = `${nowHour}`;
if (nowHour > 10) {
  hour = `0${nowHour}`;
}

let minute = document.querySelector("#minutes");
let nowMinute = now.getMinutes();
minute.innerHTML = `${nowMinute}`;
if (nowMinute > 10) {
  minute = `0${nowMinute}`;
}

let showCity = document.querySelector("#gdansk");
let putCity = document.querySelector("#submited");
let cityInfo = document.querySelector("#givenCity");

function change(event) {
  event.preventDefault();
  showCity.innerHTML = `${cityInfo.value}`;
}

putCity.addEventListener("submit", change);

let temperatureValue = document.querySelector("#temp");

function changeCel(event) {
  event.preventDefault();
  temperatureValue.innerHTML = `19`;
}
function changeFah(event) {
  event.preventDefault();
  temperatureValue.innerHTML = `66`;
}

let celsius = document.querySelector("#cel");
celsius.addEventListener("click", changeCel);

let fahrenheit = document.querySelector("#fah");
fahrenheit.addEventListener("click", changeFah);
