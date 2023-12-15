const months = [
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

const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthYear = document.querySelector("#month-year");
const date = document.querySelector("#date");
const time = document.querySelector("#time");

const windSpeed = document.querySelector("#wind-speed");
const windDeg = document.querySelector("#wind-deg");
const pressure = document.querySelector("#pressure");
const humidity = document.querySelector("#humidity");

const loc = document.querySelector("#location");
const weather = document.querySelector("#weather");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");

const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const lastSunrise = document.querySelector("#last-sunrise");
const nextSunset = document.querySelector("#next-sunset");

const formatTime = (currentDate) => {
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  let hh = hours > 12 ? hours - 12 : hours;
  hh = hh.toString().padStart(2, "0");
  let mm = minutes.toString().padStart(2, "0");

  const meridiem = hours >= 12 ? "PM" : "AM";

  return `${hh}:${mm} ${meridiem}`;
};

const getDateAndTime = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  const dayOfTheWeek = currentDate.getDay();

  monthYear.textContent = `${months[month]} ${year}`;
  date.textContent = `${days[dayOfTheWeek]}, ${monthsShort[month]} ${day}, ${year}`;
  time.textContent = formatTime(currentDate);
};

getDateAndTime();

setInterval(getDateAndTime, 1000);

const OWM_APIKey = "ee84c1a1158ec4870a2594156ec0fddf";

let lat = 0;
let long = 0;

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${OWM_APIKey}`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          windSpeed.textContent = res.wind.speed;
          pressure.textContent = res.main.pressure;
          temperature.textContent = Math.round(res.main.temp - 273);
          loc.textContent = res.name;
          weather.textContent = res.weather[0].main;
          description.textContent = res.weather[0].description;
          windDeg.textContent = res.wind.deg;
          humidity.textContent = res.main.humidity;

          sunrise.textContent = formatTime(new Date(res.sys.sunrise * 1000));
          sunset.textContent = formatTime(new Date(res.sys.sunset * 1000));

          let hoursFromSunrise = new Date(
            Date.now() - res.sys.sunrise * 1000
          ).getHours(); 

          let hoursFromSunset = new Date(
            res.sys.sunset * 1000 - Date.now()
          ).getHours();

          lastSunrise.textContent = `${hoursFromSunrise} hour${
            hoursFromSunrise > 1 ? "s" : ""
          } ago`;
          nextSunset.textContent = `in ${hoursFromSunset} hour${
            hoursFromSunset > 1 ? "s" : ""
          }`;
        });
    });
  } else {
    alert("Geolocation is not supported on this browser.");
  }
};

getLocation();

// setInterval(getLocation, 1000);
