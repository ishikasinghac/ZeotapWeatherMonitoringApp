"use client";

import { useEffect, useState } from "react";
import { fetchAllCitiesWeather, fetchWeatherListForCity, startFetchingWeatherData } from "@/utils/fetchDataUtil";
import { CityTempData, Weather } from "@/types/DataTypes";

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


import { convertEpochToDate, convertEpochToTime, kelvinToCelsius } from "@/utils/commenUtils";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


export default function Home() {

  const GET_WEATHER_UPDATE_INTERVAL = 3600000; // in miliseconds

  const [data, setData] = useState<CityTempData[]>([]);
  const [delhiWeatherList, setDelhiWeatherList] = useState<Weather[]>([]);
  const [blrData, setBlrData] = useState<Weather[]>([]);
  const [chennaiData, setChennaiData] = useState<Weather[]>([]);
  const [mumbaiData, setMumbaiData] = useState<Weather[]>([]);
  const [kolkataData, setKolkataData] = useState<Weather[]>([]);
  const [hydData, setHydData] = useState<Weather[]>([]);

  useEffect(() => {
    fetchAllCitiesWeather().then((data: CityTempData[]) => {
      setData(data);
    })

    startFetchingWeatherData(GET_WEATHER_UPDATE_INTERVAL);
  }, []);

  useEffect(() => {
    fetchWeatherListForCity("Delhi").then((data: Weather[]) => {
      setDelhiWeatherList(data);
      console.log(data.length);
    });

    fetchWeatherListForCity("Bengaluru").then((data: Weather[]) => {
      setBlrData(data);
      console.log(data.length);
    });

    fetchWeatherListForCity("Chennai").then((data: Weather[]) => {
      setChennaiData(data);
      console.log(data.length);
    });

    fetchWeatherListForCity("Mumbai").then((data: Weather[]) => {
      setMumbaiData(data);
      console.log(data.length);
    });

    fetchWeatherListForCity("Kolkata").then((data: Weather[]) => {
      setKolkataData(data);
      console.log(data.length);
    });

    fetchWeatherListForCity("Hyderabad").then((data: Weather[]) => {
      setHydData(data);
      console.log(data.length);
    });
  }, [])

  const chartData = (list: Weather[]) => {
    return {
      labels: list.map(data => {
        return convertEpochToTime(data.dateTime);
      }), // Time labels for x-axis
      datasets: [
        {
          label: 'Temperature (°C)',
          data: list.map(data => {
            return kelvinToCelsius(data.temp).toFixed(2);
          }), // Temperature data for y-axis
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.4)',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          tension: 0.2, // Makes the line curve smoothly
        },
      ],
    }
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (HH:MM:SS)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1 style={{ textAlign: "center", width: "100%", color: "#16423C" }}>
          Real-Time Weather Monitoring App
        </h1>
      </div>

      <div style={{ padding: 30, display: "flex", gap: 15 }}>
        {
          data?.map((cityTempData: CityTempData) => (
            <div key={cityTempData.id} style={{
              width: 300,
              background: "#C4DAD2",
              borderRadius: 10,
              padding: 20,
              color: "#16423C"
            }}>
              <div style={{ display: "flex" }}>
                <h3 style={{ textAlign: "center", width: "100%" }}>
                  {cityTempData?.name}
                </h3>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontWeight: "lighter" }}>
                  Temprature
                </div>
                <div>
                  {kelvinToCelsius(cityTempData.main.temp).toFixed(2)} °C
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontWeight: "lighter" }}>
                  Min Temprature
                </div>
                <div>
                  {kelvinToCelsius(cityTempData.main.temp_min).toFixed(2)} °C
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontWeight: "lighter" }}>
                  Max Temprature
                </div>
                <div>
                  {kelvinToCelsius(cityTempData.main.temp_max).toFixed(2)} °C
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontWeight: "lighter" }}>
                  Feels Like
                </div>
                <div>
                  {kelvinToCelsius(cityTempData.main.feels_like).toFixed(2)} °C
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontWeight: "lighter" }}>
                  Updated Date
                </div>
                <div>
                  {convertEpochToDate(cityTempData.dt)}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontWeight: "lighter" }}>
                  Updated Time
                </div>
                <div>
                  {convertEpochToTime(cityTempData.dt)}
                </div>
              </div>

            </div>
          ))
        }
      </div>

      <div style={{alignItems : "center", display: "flex", flexDirection: "column"}}>
        <div style={{
          marginTop: 20,
          padding: 30,
          background: "#dfdfdf",
          width: "90%",

        }}>
          <h1 style={{ textAlign: "center", width: "100%", color: "#16423C" }}>Delhi</h1>
          <Line data={chartData(delhiWeatherList)} options={chartOptions} />
        </div>

        <div style={{
          marginTop: 20,
          padding: 30,
          background: "#dfdfdf",
          width: "90%",
        }}>
          <h1 style={{ textAlign: "center", width: "100%", color: "#16423C" }}>Bengaluru </h1>
          <Line data={chartData(blrData)} options={chartOptions} />
        </div>

        <div style={{
          marginTop: 20,
          padding: 30,
          background: "#dfdfdf",
          width: "90%",
        }}>
          <h1 style={{ textAlign: "center", width: "100%", color: "#16423C" }}>Chennai</h1>
          <Line data={chartData(chennaiData)} options={chartOptions} />
        </div>

        <div style={{
          marginTop: 20,
          padding: 30,
          background: "#dfdfdf",
          width: "90%",
        }}>
          <h1 style={{ textAlign: "center", width: "100%", color: "#16423C" }}>Mumbai</h1>
          <Line data={chartData(mumbaiData)} options={chartOptions} />
        </div>

        <div style={{
          marginTop: 20,
          padding: 30,
          background: "#dfdfdf",
          width: "90%",
        }}>
          <h1 style={{ textAlign: "center", width: "100%", color: "#16423C" }}>Kolkata</h1>
          <Line data={chartData(kolkataData)} options={chartOptions} />
        </div>

        <div style={{
          marginTop: 20,
          padding: 30,
          background: "#dfdfdf",
          width: "90%",
        }}>
          <h1 style={{ textAlign: "center", width: "100%", color: "#16423C" }}>Hyderabad</h1>
          <Line data={chartData(hydData)} options={chartOptions} />
        </div>

      </div>
    </div>
  );
}
