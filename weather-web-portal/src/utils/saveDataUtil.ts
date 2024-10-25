import { Weather } from "@/types/DataTypes";
import axios from "axios";
import { headers } from "next/headers";


export const saveWeatherData = async (data: Weather) => {
    try {
        const response = await axios.post(`http://localhost:8080/weather/data/save`, data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data", error);
    }
};