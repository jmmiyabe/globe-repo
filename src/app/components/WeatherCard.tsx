// src/components/WeatherCard.tsx
'use client';

import React from 'react';
import { useWeather } from '../hooks/useWeather'; 
import { WiCloudy, WiDaySunny, WiRain, WiThunderstorm, WiSnow } from 'react-icons/wi';
import { FaExclamationTriangle } from 'react-icons/fa'; 

const getWeatherIcon = (weatherId: number) => {
  if (weatherId >= 200 && weatherId <= 232) return <WiThunderstorm className="text-red-400" />;
  if (weatherId >= 500 && weatherId <= 531) return <WiRain className="text-blue-400" />;
  if (weatherId >= 600 && weatherId <= 622) return <WiSnow className="text-cyan-300" />;
  if (weatherId === 800) return <WiDaySunny className="text-yellow-400" />;
  if (weatherId >= 801 && weatherId <= 804) return <WiCloudy className="text-gray-400" />;
  return <FaExclamationTriangle className="text-orange-400" />;
};

export default function WeatherCard() {
  const { weather, isLoading, isError } = useWeather();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8 text-slate-700 dark:text-white h-full"> 
        <h3 className="text-xl font-bold mb-4">WEATHER STATUS</h3>
        <p className="text-lg">Loading Data...</p>
      </div>
    );
  }

  if (isError || !weather || !weather.current) {
    return (
      <div className="p-8 bg-pink-400 rounded-3xl text-white flex items-center space-x-4 shadow-xl h-full"> 
        <FaExclamationTriangle className="w-8 h-8" />
        <p className="text-lg font-bold">FAILED TO LOAD WEATHER DATA.</p>
      </div>
    );
  }

  const currentStatus = weather.current.weather[0]; 
  const currentTemp = Math.round(weather.current.temp);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8 transition-shadow hover:shadow-2xl h-full">
      <h3 className="text-xl font-bold text-slate-700 dark:text-gray-100 mb-4 flex items-center">
        {getWeatherIcon(currentStatus.id)}
        <span className="ml-3">WEATHER STATUS</span>
      </h3>
      <div className="flex justify-between items-end mt-6">
        <div>
          <p className="text-6xl font-extrabold text-blue-500 dark:text-blue-400">
            {currentTemp}°C
          </p>
          <p className="text-lg font-semibold text-slate-600 dark:text-gray-400 mt-2">
            {currentStatus.description.toUpperCase()}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-7xl text-blue-400 dark:text-blue-300">
            {getWeatherIcon(currentStatus.id)}
          </span>
        </div>
      </div>
    </div>
  );
}