const input = document.querySelector('input');
const button = document.querySelector('button');
const image = document.querySelector('img');
const errorMessage = document.querySelector('.error');
const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const feelsLike = document.querySelector('.feels-like');
const windSpeed = document.querySelector('.wind-speed');
const cloud = document.querySelector('.cloud');
const pressure = document.querySelector('.pressure');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=44ad5dd5f4fac258f761c9f5df786a86';
const apiUnits = '&units=metric';
const apiLanguage = '&lang=pl';

function getWeather() {
    const apiCity = input.value;
    const URL = apiLink + apiCity + apiKey + apiUnits + apiLanguage;

    axios.get(URL).then(response => {
        image.src = `${"http://openweathermap.org/img/wn/" + response.data.weather[0].icon + ".png"}`;
        cityName.textContent = `${response.data.name}`;
        temperature.textContent = `${Math.round(response.data.main.temp)} °C`;
        weatherDescription.textContent = `${response.data.weather[0].description}`;
        feelsLike.textContent = `${Math.round(response.data.main.feels_like)} °C`;
        windSpeed.textContent = `${Math.round(response.data.wind.speed * 3.6)} km/h`;
        cloud.textContent = `${response.data.clouds.all} %`;
        pressure.textContent = `${response.data.main.pressure} hPa`;
        humidity.textContent = `${response.data.main.humidity} %`;
        errorMessage.textContent = '';
    }).catch(error => {
        if(error.response.data.cod === '404' || error.response.data.cod === '400') {
            errorMessage.textContent = `${error.response.data.message}`;
        } else {
            errorMessage.textContent = 'Wystąpił błąd'
        }

        [cityName, temperature, weatherDescription, feelsLike, humidity, pressure, windSpeed, cloud].forEach(el => {
            el.textContent = '';
        })
        image.src = '';
    }).finally(() => input.value = '');
}

button.addEventListener('click', getWeather);