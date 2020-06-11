(() => {
  const KEY = '9da475ce-9718-4eb9-8962-e3f81ee5d122';

  async function getAirQuality({
    city,
    state,
    country
  }) {
    const response = await fetch(`https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${KEY}`
);

    const {
      data: {
        current
      }
    } = await response.json();
    const {
      pollution,
      weather
    } = current;
    return {
      aqi: pollution.aqius,
      temperature: weather.tp,
      humidity: weather.hu,
      wind: weather.ws

    };
  }

  function displayAirQuality({
    city,
    state,
    country,
    aqi,
    temperature,
    humidity,
    wind
  }) {
    const cityElem = document.querySelector('.city'); //ดึงข้อมูลมากจาก class หน้า index
    const stateElem = document.querySelector('.state-country');
    const aqiElem = document.querySelector('.aqi > h1');
    const temperatureElem = document.querySelector('.temperature');
    const humidityElem = document.querySelector('.humidity');
    const windElem = document.querySelector('.wind');


    cityElem.innerText = city;
    stateElem.innerText = `${state}, ${country}`;
    aqiElem.innerText = aqi;
    temperatureElem.innerText = `Temp: ${temperature}`;
    humidityElem.innerText = `Humidity: ${humidity}%`;
    windElem.innerText = `Wind: ${wind}m/s`;


  }


  function setAirQualityColor(aqi) {
    if (aqi <= 50) {
      document.documentElement.style.setProperty(
        "--current-aqi-color",
        "var(--good-aqi-color)"
      );
    } else if (aqi <= 100) {
      document.documentElement.style.setProperty(
        "--current-aqi-color",
        "var(--medium-aqi-color)"
      );
    } else {
      document.documentElement.style.setProperty(
        "--current-aqi-color",
        "var(--bad-aqi-color)"
      );
    }
  }


  async function run() {
    const city = "Los angeles";
    const state = "California";
    const country = "USA";

    const {
      aqi,
      temperature,
      humidity,
      wind
    } = await getAirQuality({
      city,
      state,
      country
    });

    displayAirQuality({
      city,
      state,
      country,
      aqi,
      temperature,
      humidity,
      wind
    });

    setAirQualityColor(aqi);

  }

  run();
})();
