// services/WeatherService.js
import axios from 'axios';

const API_KEY = '44101fa60a0416c2236cabcdcf2fa8f6 ';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

const getWeather = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        return response.data;
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        throw error;
    }
};

export default getWeather;
