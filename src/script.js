import './styles.css';

const apiKey = '599d155f26384f1a882101324240912'; // Replace with your actual API key
const baseURL = 'https://api.weatherapi.com/v1/current.json';

async function fetchWeather(location) {
    const url = `${baseURL}?key=${apiKey}&q=${encodeURIComponent(location)}`;
    console.log('Fetching URL:', url);
    try {
        const response = await fetch(url);
        console.log('Response Status:', response.status);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Weather Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

document.getElementById('location-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = document.getElementById('location').value.trim();
    const loadingDiv = document.getElementById('loading');
    const weatherDisplay = document.getElementById('weather-display');

    if (!location) {
        weatherDisplay.innerHTML = '<p>Please enter a valid location.</p>';
        return;
    }

    loadingDiv.style.display = 'block';
    weatherDisplay.innerHTML = '';

    const weatherData = await fetchWeather(location);

    loadingDiv.style.display = 'none';

    if (weatherData) {
        displayWeather(weatherData);
    } else {
        weatherDisplay.innerHTML = '<p>Unable to fetch weather data. Please try again.</p>';
    }
});

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    const location = `${data.location.name}, ${data.location.country}`;
    const temperature = `${data.current.temp_c}°C`;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;

    weatherDisplay.innerHTML = `
        <h2>Weather in ${location}</h2>
        <img src="https:${icon}" alt="${condition}">
        <p>Temperature: ${temperature}</p>
        <p>Condition: ${condition}</p>
    `;
}
