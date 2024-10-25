
import { CityTempData, Weather } from '@/types/DataTypes';
import axios from 'axios';
import { saveWeatherData } from './saveDataUtil';

const API_KEY = 'ac3eb32798e5b7cac120ae1ec14d2437';
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const fetchWeatherData = async (city: string) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data", error);
    }
};

export const fetchAllCitiesWeather = async () => {
    const promises = CITIES.map((city) => {
        const promise = fetchWeatherData(city);

        promise.then((data: CityTempData) => {
            const weather: Weather = {
                name: data.name,
                main: "",
                description: "",
                temp: data.main.temp,
                feels_like: data.main.feels_like,
                humidity: data.main.humidity,
                visibility: data.visibility,
                windDeg: data.wind.deg,
                windSpeed: data.wind.speed,
                dateTime: data.dt,
            }

            saveWeatherData(weather).then(() => {
                console.info("Data saved to DB");
            });
        })

        return promise;
    });
    return await Promise.all(promises);
};

export const startFetchingWeatherData = (intervalTime = 300000) => {

    fetchAllCitiesWeather().then(data => console.log("Initial Weather Data:", data));

    setInterval(async () => {
        const data = await fetchAllCitiesWeather();

        console.log("Updated Weather Data:", data);
    }, intervalTime);
};


export const fetchWeatherListForCity = async(city: string) => {
    try {
        const response = await axios.post("http://localhost:8080/weather/data/get", {city}, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        return response.data;
    }
    catch (error) {
        console.error("Error fetching weather data", error);
    }
}