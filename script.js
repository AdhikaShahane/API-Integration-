
const API_KEY = '17791e8bd048e279fad11513f0a471c4';


const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherDisplay = document.getElementById('weather-display');
const backgroundVideo = document.getElementById('background-video');
const videoSource = backgroundVideo.querySelector('source');


const videoPaths = {
    rainy_day: '163258-827461367draniy_small.mp4',
    rainy_night: '305-135918495nraniy_tiny.mp4',
    sunny_day: '59483-493557880sunny_tiny.mp4',
    general_night: '169951-842348732night_tiny.mp4', // General night for clear/other non-rainy conditions
    overcast_clouds: '53358-472726684overcast clouds_tiny.mp4',
    default_cloudy: '127349-738456855cloudy_tiny.mp4' // Default for unmatched or general cloudy
};


function isDaytime(data) {
    if (!data.dt || !data.sys || !data.sys.sunrise || !data.sys.sunset) {
        
        console.warn("Missing time data for day/night determination. Assuming day.");
        return true; 
    }

    const currentTime = data.dt; 
    const sunriseTime = data.sys.sunrise; 
    const sunsetTime = data.sys.sunset; 

    return currentTime >= sunriseTime && currentTime < sunsetTime;
}

function updateBackgroundVideo(data) {
    let videoToLoad = videoPaths.default_cloudy; 
    
    const weatherMain = data.weather?.[0]?.main?.toLowerCase() || 'unknown';
    const weatherDescription = data.weather?.[0]?.description?.toLowerCase() || '';
    const cloudiness = data.clouds?.all; 
    const isDay = isDaytime(data);

    if (weatherMain === 'clear') {
        videoToLoad = isDay ? videoPaths.sunny_day : videoPaths.general_night;
    } else if (weatherMain === 'rain' || weatherMain === 'drizzle' || weatherMain === 'thunderstorm') {
        videoToLoad = isDay ? videoPaths.rainy_day : videoPaths.rainy_night;
    } else if (weatherMain === 'clouds') {

        if (weatherDescription.includes('overcast') || cloudiness >= 85) { 

        } else {
            
            videoToLoad = isDay ? videoPaths.default_cloudy : videoPaths.general_night; 
        }
    } else {
        videoToLoad = isDay ? videoPaths.default_cloudy : videoPaths.general_night;
    }

    if (!videoSource.src.includes(videoToLoad)) { 
        videoSource.src = videoToLoad; 
        backgroundVideo.load(); 
        backgroundVideo.play().catch(error => {
            console.warn('Video autoplay failed:', error);
        });
    }
}


async function fetchWeatherData(city) {
    if (!API_KEY || API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
        alert('Please ensure your actual API key is set in script.js!');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        weatherDisplay.innerHTML = '<p class="loading-message">Fetching weather...</p>'; // Show loading message
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                weatherDisplay.innerHTML = '<p class="error-message">City not found. Please try again.</p>';
            } else {
                weatherDisplay.innerHTML = `<p class="error-message">Error: ${response.status} - ${response.statusText}</p>`;
            }
            updateBackgroundVideo({ weather: [{ main: 'default' }], clouds: { all: 0 }, dt: Date.now() / 1000, sys: { sunrise: 0, sunset: 0 } }); 
            return;
        }

        const data = await response.json();
        console.log("Fetched Data:", data);

        updateBackgroundVideo(data); // Pass the entire data object now

        const cityName = data.name || 'N/A';
        const country = data.sys?.country || 'N/A';
        const temp = data.main?.temp;
        const weatherDescription = data.weather?.[0]?.description;
        const humidity = data.main?.humidity;
        const windSpeed = data.wind?.speed;
        const feelsLike = data.main?.feels_like;
        const currentStatus = isDaytime(data) ? 'Day' : 'Night'; // Determine Day/Night status for display

        let weatherHtml = `
            <div class="weather-box">
                <h2>${cityName}, ${country}</h2>
                <p><strong>Status:</strong> ${currentStatus}</p> <p><strong>Temperature:</strong> ${temp !== undefined ? `${temp}°C` : 'N/A'}</p>
                <p><strong>Feels like:</strong> ${feelsLike !== undefined ? `${feelsLike}°C` : 'N/A'}</p>
                <p><strong>Conditions:</strong> ${weatherDescription ? weatherDescription : 'N/A'}</p>
                <p><strong>Humidity:</strong> ${humidity !== undefined ? `${humidity}%` : 'N/A'}</p>
                <p><strong>Wind Speed:</strong> ${windSpeed !== undefined ? `${windSpeed} m/s` : 'N/A'}</p>
            </div>
        `;
        weatherDisplay.innerHTML = weatherHtml;

    } catch (error) {
        console.error('Error fetching or processing weather data:', error);
        weatherDisplay.innerHTML = '<p class="error-message">Failed to load weather data. Please check console for details. Please try again later.</p>';
        updateBackgroundVideo({ weather: [{ main: 'default' }], clouds: { all: 0 }, dt: Date.now() / 1000, sys: { sunrise: 0, sunset: 0 } });
    }
}

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name!');
    }
});

window.addEventListener('load', () => {
    fetchWeatherData('Pune'); 
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getWeatherBtn.click();
    }
});