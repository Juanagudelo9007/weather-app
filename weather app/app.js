const tittle = document.querySelector(".tittle");
const body = document.querySelector("body");
const inputDisplay = document.getElementById("search");

window.addEventListener("load", () => {
  let randomImg = Math.ceil(Math.random() * 6);
  body.style.backgroundImage = `url("img/bg${randomImg}.jpg")`;

  if (randomImg == 5 || randomImg == 4) {
    tittle.style.color = "white";
    inputDisplay.style.backgroundColor = "gray";
  }
});

inputDisplay.addEventListener("keypress", (callback) => {
  if ((callback.key = "Enter")) {
    dataFetch();
  }
});

let dataApi = {
  url: "https://api.openweathermap.org/data/2.5/weather?q=",
  key: "124b92a8dd9ec01ffb0dbf64bc44af3c",
};

inputDisplay.value = "london";
dataFetch();
inputDisplay.value = "";

function dataFetch() {
  let getCity = inputDisplay.value;
  fetch(`${dataApi.url}${getCity}&&appid=${dataApi.key}`)
    .then((response) => response.json())
    .then((data) => {
      infoOnDisplay(data);
    });
}

const cityName = document.querySelector(".city");
const temperature = document.querySelector(".temperature");
const conditions = document.querySelector(".conditions");
const humidity = document.querySelector(".humidity");
const date = document.querySelector(".date");

function infoOnDisplay(data) {
  cityName.innerHTML = `${data.name}, ${data.sys.country}`;
  temperature.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
  conditions.innerHTML = data.weather[0].description;
  humidity.innerHTML = `humidity: ${data.main.humidity}%`;
  date.innerHTML = getDate();
}

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
  "December",
];
function getDate() {
  let time = new Date();
  let month = months[time.getMonth()];
  return `${time.getDate()} ${month} ${time.getFullYear()}`;
}
