// WeatherContext.js
import React, { createContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [city, setCity] = useState('');
    const [temperature, setTemperature] = useState(null);
    const [feelsLike, setFeelsLike] = useState(null);
    const [tempMax, setTempMax] = useState(null);
    const [tempMin, setTempMin] = useState(null);
    const [description, setDescription] = useState('');
    const [humidity, setHumidity] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);
    const [pressure, setPressure] = useState(null);
    const [icon, setIcon] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(null);
    const [permissionDenied, setPermissionDenied] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]); 

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setPermissionDenied(true);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
            fetchWeatherByLocation(location.coords.latitude, location.coords.longitude);
        })();
    }, []);

    const fetchWeatherByLocation = async (latitude, longitude) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getWeatherByCoords(latitude, longitude);
            setCity(data.name);
            setTemperature(Math.round(data.main.temp));
            setFeelsLike(Math.round(data.main.feels_like));
            setTempMax(Math.round(data.main.temp_max));
            setTempMin(Math.round(data.main.temp_min));
            setDescription(data.weather[0].description);
            setHumidity(data.main.humidity);
            setWindSpeed(data.wind.speed);
            setPressure(data.main.pressure);
            setIcon(data.weather[0].icon);
        } catch (err) {
            setError('No se pudo obtener los datos del clima.');
        } finally {
            setLoading(false);
        }
    };

    const getWeatherByCoords = async (lat, lon) => {
        const API_KEY = 'a91ccd716fb61fa538751109cd598f2a';
        const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
        try {
            const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            return await response.json();
        } catch (error) {
            throw error;
        }
    };

    const getWeatherByCity = async (cityName) => {
        const API_KEY = 'a91ccd716fb61fa538751109cd598f2a';
        const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`);
            const data = await response.json();
            setCity(data.name);
            setTemperature(Math.round(data.main.temp));
            setFeelsLike(Math.round(data.main.feels_like));
            setTempMax(Math.round(data.main.temp_max));
            setTempMin(Math.round(data.main.temp_min));
            setDescription(data.weather[0].description);
            setHumidity(data.main.humidity);
            setWindSpeed(data.wind.speed);
            setPressure(data.main.pressure);
            setIcon(data.weather[0].icon);

            setSearchHistory((prevHistory) => {
                const newHistory = [data.name, ...prevHistory];
                return newHistory.slice(0, 3); 
            });
        } catch (err) {
            setError('No se pudo obtener los datos del clima.');
        } finally {
            setLoading(false);
        }
    };

    const removeCityFromHistory = (index) => {
        setSearchHistory(prevHistory => prevHistory.filter((_, i) => i !== index));
    };

    const handlePermissionRequest = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            setPermissionDenied(false);
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
            fetchWeatherByLocation(location.coords.latitude, location.coords.longitude);
        } else {
            setError('Permiso de localización denegado');
        }
    };

    return (
        <WeatherContext.Provider
            value={{
                city,
                temperature,
                feelsLike,
                tempMax,
                tempMin,
                description,
                humidity,
                windSpeed,
                pressure,
                icon,
                loading,
                error,
                permissionDenied,
                handlePermissionRequest,
                getWeatherByCity,
                searchHistory,
                removeCityFromHistory
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};
